HighlightLineView = require './highlight-line-view'

module.exports =
  highlightLineView: null

  activate: (state) ->
    @highlightLineView = new HighlightLineView(state.highlightLineViewState)

  deactivate: ->
    @highlightLineView.destroy()

  serialize: ->
    highlightLineViewState: @highlightLineView.serialize()
