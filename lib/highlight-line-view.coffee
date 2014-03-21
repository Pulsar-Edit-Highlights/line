{EditorView, View} = require 'atom'
{$} = require 'atom'

lines = []
underlineStyles = ["solid","dotted","dashed"]
underlineStyleInUsed = ''

module.exports =
  configDefaults:
    allEnable: true
    enableBackgroundColor: true
    backgroundRgbColor: "100, 100, 100"
    opacity: "50%"
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

  deactivate: ->
    for line in lines
      line.destroy()
    lines = []

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
    for underlineStyle in underlineStyles
      @subscribe atom.config.observe(
        "highlight-line.underline.#{underlineStyle}",
        callNow: false,
        @updateSetting)
    @updateSelectedLine()

  updateUnderlineStyle: ->
    underlineStyleInUsed = ''
    @marginHeight = 0
    for underlineStyle in underlineStyles
      if atom.config.get "highlight-line.underline.#{underlineStyle}"
        underlineStyleInUsed = underlineStyle
        @marginHeight = -1

  updateSetting: (value) =>
    if value
      if underlineStyleInUsed
        atom.config.set(
          "highlight-line.underline.#{underlineStyleInUsed}",
          false)
    @updateUnderlineStyle()

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
    if atom.config.get('highlight-line.allEnable')
      @showHighlight()

  resetBackground: ->
    $('.line').css('background-color', '')
              .css('border-bottom','')
              .css('margin-bottom','')

  makeLineStyleAttr: ->
    styleAttr = ''
    if atom.config.get('highlight-line.enableBackgroundColor')
      bgColor = @wantedColor('backgroundRgbColor')
      bgRgba = "rgba(#{bgColor}, #{@wantedOpacity()})"
      styleAttr += "background-color: #{bgRgba};"
    if underlineStyleInUsed
      ulColor = @wantedColor('underlineRgbColor')
      ulRgba = "rgba(#{ulColor},1)"
      styleAttr += "border-bottom: 1px #{underlineStyleInUsed} #{ulRgba};"
      styleAttr += "margin-bottom: #{@marginHeight}px;"
    styleAttr

  showHighlight: =>
    styleAttr = @makeLineStyleAttr()
    if styleAttr
      cursorViews = @editorView.getCursorViews()
      for cursorView in cursorViews
        range = cursorView.getScreenPosition()
        lineElement = @editorView.lineElementForScreenRow(range.row)
        if @editorView.editor.getSelection().isSingleScreenLine()
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
    if wantedOpacity isnt 100
      wantedOpacity = "0.#{wantedOpacity}"
    wantedOpacity
