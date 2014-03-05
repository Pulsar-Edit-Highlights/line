HighlightLineView = require './highlight-line-view'

module.exports =
  configDefaults:
    enable: true
    backgroundRgaColor: "100, 100, 100"
    opacity: "50%"
  highlightLineView: null

  activate: (state) ->
    @highlightLineView = new HighlightLineView(state.highlightLineViewState)

  deactivate: ->
    @highlightLineView.destroy()

  serialize: ->
    highlightLineViewState: @highlightLineView.serialize()
