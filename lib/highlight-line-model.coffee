{CompositeDisposable} = require 'atom'
{Point} = require 'atom'

lines = []

module.exports =
class HighlightLineView

  constructor: ->
    @subscriptions = new CompositeDisposable

    @subscriptions.add(atom.workspace.observeTextEditors((activeEditor) =>
      activeEditor.onDidAddSelection(@updateSelectedLine)
      activeEditor.onDidChangeSelectionRange(@updateSelectedLine)
      activeEditor.onDidRemoveSelection(@updateSelectedLine)
    ))
    @subscriptions.add(
      atom.workspace.onDidChangeActivePaneItem(@updateSelectedLine)
    )

    @markers = []
    @observeSettings()
    @updateSelectedLine()

  getEditor: ->
    atom.workspace.getActiveTextEditor()

  # Tear down any state and detach
  destroy: =>
    @subscriptions.dispose()

  updateSelectedLine: =>
    @resetBackground()
    @showHighlight()

  resetBackground: ->
    for decoration in @markers
      decoration.destroy()
      decoration = null
    @markers = []

  showHighlight: =>
    return unless @getEditor()
    @handleMultiLine()
    @handleSingleLine()

  handleSingleLine: =>
    for selection in @getEditor().getSelections()
      if selection.isSingleScreenLine()
        selectionRange = selection.getBufferRange()
        unless selection.getText() isnt '' \
        and atom.config.get("highlight-line.hideHighlightOnSelect")
          if atom.config.get('highlight-line.enableBackgroundColor')
            @createDecoration(selectionRange)

        if atom.config.get('highlight-line.enableUnderline')
          style = atom.config.get "highlight-line.underline"
          @createDecoration(selectionRange,
            "-multi-line-#{style}-bottom")

  handleMultiLine: =>
    return unless atom.config.get('highlight-line.enableSelectionBorder')

    selections = @getEditor().getSelections()
    for selection in selections
      unless selection.isSingleScreenLine()
        selectionRange = selection.getBufferRange().copy()
        topLine = selectionRange
        bottomLine = selectionRange.copy()

        topLine.end = topLine.start
        bottomLine.start = new Point(bottomLine.end.row - 1,
                                     bottomLine.end.column)

        style = atom.config.get "highlight-line.underline"

        @createDecoration(topLine,
          "-multi-line-#{style}-top")
        @createDecoration(bottomLine,
          "-multi-line-#{style}-bottom")

  createDecoration: (range, klassToAdd = '') =>
    klass = 'highlight-line'
    klass += klassToAdd
    marker = @getEditor().markBufferRange(range)
    decoration = @getEditor()
      .decorateMarker(marker, {type: 'line', class: klass})

    @markers.push marker

  observeSettings: =>
    @subscriptions.add atom.config.onDidChange(
      "highlight-line.enableBackgroundColor", @updateSelectedLine)
    @subscriptions.add atom.config.onDidChange(
      "highlight-line.hideHighlightOnSelect", @updateSelectedLine)
    @subscriptions.add atom.config.onDidChange(
      "highlight-line.enableUnderline", @updateSelectedLine)
    @subscriptions.add atom.config.onDidChange(
      "highlight-line.enableSelectionBorder", @updateSelectedLine)
