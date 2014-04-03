{EditorView, View} = require 'atom'
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
    atom.workspaceView.command 'highlight-line:toggle-underline', '.editor', =>
      @toggleUnderline()

  deactivate: ->
    for line in lines
      line.destroy()
      line = null
    lines = []
    atom.workspaceView.off 'highlight-line:toggle-background'
    atom.workspaceView.off 'highlight-line:toggle-underline'

  toggleHighlight: ->
    current = atom.config.get('highlight-line.enableBackgroundColor')
    atom.config.set('highlight-line.enableBackgroundColor', not current)

  toggleUnderline: ->
    current = atom.config.get('highlight-line.enableUnderline')
    atom.config.set('highlight-line.enableUnderline', not current)

class HighlightLineView extends View

  @content: ->
    @div class: 'highlight-view hidden'

  initialize: (@editorView) ->
    @defaultColors = {
      backgroundRgbColor: "100, 100, 100",
      underlineColor: "255, 165, 0"}
    @defaultOpacity = 50

    @subscribe @editorView, 'cursor:moved', @updateSelectedLine
    @subscribe @editorView, 'selection:changed', @updateSelectedLine
    @subscribe @editorView.getPane(), 'pane:active-item-changed',
      @updateSelectedLine
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
    $('.line').css('background-color', '')
              .css('border-bottom','')
              .css('margin-bottom','')

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
        styleAttr += "background-color: #{bgRgba};"
    if atom.config.get('highlight-line.enableUnderline') and underlineStyleInUse
      ulColor = @wantedColor('underlineRgbColor')
      ulRgba = "rgba(#{ulColor},1)"
      styleAttr += "border-bottom: 1px #{underlineStyleInUse} #{ulRgba};"
      styleAttr += "margin-bottom: #{@marginHeight}px;"
    styleAttr

  showHighlight: =>
    styleAttr = @makeLineStyleAttr()
    if styleAttr
      cursorViews = @editorView.getCursorViews()
      for cursorView in cursorViews
        range = cursorView.getScreenPosition()
        lineElement = @editorView.lineElementForScreenRow(range.row)
        if @editorView.editor.getSelection()?.isSingleScreenLine()
          $(lineElement).attr 'style', styleAttr

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
      "highlight-line.enableUnderline",
      callNow: false,
      @updateSelectedLine)
