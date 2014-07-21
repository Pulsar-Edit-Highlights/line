{ReactEditorView, EditorView, View} = require 'atom'
{$} = require 'atom'

lines = []
underlineStyles = ["solid","dotted","dashed"]
underlineStyleInUse = ''

module.exports =
  configDefaults:
    enableBackgroundColor: true
    hideHighlightOnSelect: false
    backgroundRgbColor: "100, 100, 100"
    opacity: "50%"
    enableUnderline: false
    enableSelectionBorder: false
    underline:
      solid: false
      dotted: false
      dashed: false
    underlineRgbColor: "255, 165, 0"

  activate: ->
    atom.workspaceView.eachEditorView (editorView) ->
      if editorView.attached and editorView.getPane()
        line = new HighlightLineView(editorView)
        lines.push line
        editorView.underlayer.append(line)

    atom.workspaceView.command 'highlight-line:toggle-background', '.editor', =>
      @toggleHighlight()
    atom.workspaceView.command 'highlight-line:toggle-hide-highlight-on-select', '.editor', =>
      @toggleHideHighlightOnSelect()
    atom.workspaceView.command 'highlight-line:toggle-underline', '.editor', =>
      @toggleUnderline()
    atom.workspaceView.command 'highlight-line:toggle-selection-borders', '.editor', =>
      @toggleSelectionBorders()

  deactivate: ->
    for line in lines
      line.destroy()
      line = null
    lines = []
    atom.workspaceView.off 'highlight-line:toggle-background'
    atom.workspaceView.off 'highlight-line:toggle-underline'
    atom.workspaceView.off 'highlight-line:toggle-selection-borders'

  toggleHighlight: ->
    current = atom.config.get('highlight-line.enableBackgroundColor')
    atom.config.set('highlight-line.enableBackgroundColor', not current)

  toggleHideHighlightOnSelect: ->
    current = atom.config.get('highlight-line.hideHighlightOnSelect')
    atom.config.set('highlight-line.hideHighlightOnSelect', not current)

  toggleUnderline: ->
    current = atom.config.get('highlight-line.enableUnderline')
    atom.config.set('highlight-line.enableUnderline', not current)

  toggleSelectionBorders: ->
    current = atom.config.get('highlight-line.enableSelectionBorder')
    atom.config.set('highlight-line.enableSelectionBorder', not current)

class HighlightLineView extends View

  @content: ->
    @div class: 'highlight-view hidden'

  initialize: (@editorView) ->
    @defaultColors = {
      backgroundRgbColor: "100, 100, 100",
      underlineColor: "255, 165, 0"}
    @defaultOpacity = 50

    @subscribe @editorView, 'editor:display-updated', @updateSelectedLine
    atom.workspaceView.on 'pane:item-removed', @destroy

    @updateUnderlineStyle()
    @observeSettings()
    @updateSelectedLine()

  updateUnderlineStyle: ->
    underlineStyleInUse = ''
    @marginHeight = 0
    for underlineStyle in underlineStyles
      if atom.config.get "highlight-line.underline.#{underlineStyle}"
        underlineStyleInUse = underlineStyle
        @marginHeight = -1

  updateUnderlineSetting: (value) =>
    if value
      if underlineStyleInUse
        atom.config.set(
          "highlight-line.underline.#{underlineStyleInUse}",
          false)
    @updateUnderlineStyle()
    @updateSelectedLine()

  # Tear down any state and detach
  destroy: =>
    found = false
    for editor in atom.workspaceView.getEditorViews()
      found = true if editor.id is @editorView.id
    return if found
    atom.workspaceView.off 'pane:item-removed', @destroy
    @unsubscribe()
    @remove()
    @detach()

  updateSelectedLine: =>
    @resetBackground()
    @showHighlight()

  resetBackground: ->
    $('.highlight-line-pkg').css('background-color','')
                            .css('border-top','')
                            .css('border-bottom','')
                            .css('margin-bottom','')
                            .css('margin-top','')
    $('.highlight-line-pkg[data-screen-row]').each (index, line) ->
      if $(line).attr('style')?.indexOf('background') isnt -1
        top = $(line).css('top')
        $(line).attr('style', "position: absolute; top: #{top}; " +
          "width: 100%;") if top?
    $('.highlight-line-pkg').removeClass('highlight-line-pkg')

  makeLineStyleAttr: ->
    styleAttr = ''
    if atom.config.get('highlight-line.enableBackgroundColor')
      show = true
      if atom.config.get('highlight-line.hideHighlightOnSelect')
        if !atom.workspace.getActiveEditor()?.getSelection().isEmpty()
          show = false
      if show
        bgColor = @wantedColor('backgroundRgbColor')
        bgRgba = "rgba(#{bgColor}, #{@wantedOpacity()})"
        styleAttr += "background: #{bgRgba} !important;"
    if atom.config.get('highlight-line.enableUnderline') and underlineStyleInUse
      ulColor = @wantedColor('underlineRgbColor')
      ulRgba = "rgba(#{ulColor},1)"
      styleAttr += "border-bottom: 1px #{underlineStyleInUse} #{ulRgba};"
      styleAttr += "margin-bottom: #{@marginHeight}px;"
    styleAttr

  makeSelectionStyleAttr: ->
    styleAttr = ''
    return [] unless underlineStyleInUse
    ulColor = @wantedColor('underlineRgbColor')
    ulRgba = "rgba(#{ulColor},1)"
    topStyleAttr = "margin-top: #{@marginHeight}px;"
    bottomStyleAttr = "margin-bottom: #{@marginHeight}px;"
    topStyleAttr += "border-top: 1px #{underlineStyleInUse} #{ulRgba};"
    bottomStyleAttr += "border-bottom: 1px #{underlineStyleInUse} #{ulRgba};"
    [topStyleAttr, bottomStyleAttr]

  showHighlight: =>
    styleAttr = @makeLineStyleAttr()
    if styleAttr
      if @editorView.getCursorViews?
        cursors = @editorView.getCursorViews()
      else
        editor = @editorView.getEditor()
        cursors = editor.getCursors()
      for cursor in cursors
        range = cursor.getScreenPosition()
        lineElement = @findLineElementForRow(@editorView, range.row)
        if selection = @editorView.editor.getSelection()
          if selection.isSingleScreenLine()
            @handleSingleLine(lineElement, styleAttr)
          else if atom.config.get('highlight-line.enableSelectionBorder')
            @handleMultiLine(styleAttr)


  handleSingleLine: (lineElement, styleAttr) =>
    if @editorView.constructor.name is "ReactEditorView"
      topPX = $(lineElement).css("top")
      styleAttr += "position: absolute; top: #{topPX}; width: 100%;" if topPX?

    $(lineElement).attr 'style', styleAttr
    $(lineElement).addClass('highlight-line-pkg')

  handleMultiLine: (styleAttr) =>
    selectionStyleAttrs = @makeSelectionStyleAttr()
    return if selectionStyleAttrs.length is 0
    selections = @editorView.editor.getSelections()
    for selection in selections
      selectionRange = selection.getScreenRange()
      start = selectionRange.start.row
      end = selectionRange.end.row

      startLine = @findLineElementForRow(@editorView, start)
      endLine = @findLineElementForRow(@editorView, end)
      if @editorView.constructor.name is "ReactEditorView"
        topPX = $(startLine).css("top")
        selectionStyleAttrs[0] += "position: absolute; top: #{topPX}; width: 100%;" if topPX?
        topPX = $(endLine).css("top")
        selectionStyleAttrs[1] += "position: absolute; top: #{topPX}; width: 100%;" if topPX?

      $(startLine).attr 'style', selectionStyleAttrs[0]
      $(endLine).attr 'style', selectionStyleAttrs[1]

      $(startLine).addClass('highlight-line-pkg')
      $(endLine).addClass('highlight-line-pkg')

  findLineElementForRow: (editorView, row) ->
    if editorView.lineElementForScreenRow?
      editorView.lineElementForScreenRow(row)
    else
      editorView.component.lineNodeForScreenRow(row)

  wantedColor: (color) ->
    wantedColor = atom.config.get("highlight-line.#{color}")
    if wantedColor?.split(',').length isnt 3
      wantedColor = @defaultColors[color]
    wantedColor

  wantedOpacity: ->
    wantedOpacity = atom.config.get('highlight-line.opacity')
    if wantedOpacity
      wantedOpacity = parseFloat(wantedOpacity)
    else
      wantedOpacity = @defaultOpacity
    (wantedOpacity/100).toString()

  observeSettings: =>
    for underlineStyle in underlineStyles
      @subscribe atom.config.observe(
        "highlight-line.underline.#{underlineStyle}",
        callNow: false,
        @updateUnderlineSetting)

    @subscribe atom.config.observe(
      "highlight-line.enableBackgroundColor",
      callNow: false,
      @updateSelectedLine)
    @subscribe atom.config.observe(
      "highlight-line.hideHighlightOnSelect",
      callNow: false,
      @updateSelectedLine)
    @subscribe atom.config.observe(
      "highlight-line.enableUnderline",
      callNow: false,
      @updateSelectedLine)
    @subscribe atom.config.observe(
      "highlight-line.enableSelectionBorder",
      callNow: false,
      @updateSelectedLine)
