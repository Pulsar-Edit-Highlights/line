{EditorView, View} = require 'atom'
{$} = require 'atom'

lines = []

module.exports =
  configDefaults:
    enable: true
    backgroundRgaColor: "100, 100, 100"
    opacity: "50%"

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
    @defaultBgColor = "100, 100, 100"
    @defaultOpacity = 50
    @subscribe @editorView, 'cursor:moved', @updateSelectedLine
    @subscribe @editorView, 'selection:changed', @updateSelectedLine
    @subscribe @editorView.getPane(), 'pane:active-item-changed',
      @updateSelectedLine
    @subscribe @editorView, 'core:close', @destroy
    @updateSelectedLine()

  # Tear down any state and detach
  destroy: =>
    @unsubscribe()
    @remove()
    @detach()

  updateSelectedLine: =>
    @resetBackground()
    if atom.config.get('highlight-line.enable')
      @showHighlight()

  resetBackground: ->
    $('.line').css('background-color', '')

  showHighlight: =>
    rgba = "rgba(#{@wantedColor()}, #{@wantedOpacity()})"
    cursorViews = @editorView.getCursorViews()
    for cursorView in cursorViews
      range = cursorView.getScreenPosition()
      lineElement = @editorView.lineElementForScreenRow(range.row)
      $(lineElement).attr('style', "background-color: #{rgba}")

  wantedColor: ->
    wantedColor = atom.config.get('highlight-line.backgroundRgaColor')
    if wantedColor?.split(',').length isnt 3
      wantedColor = @defaultBgColor
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
