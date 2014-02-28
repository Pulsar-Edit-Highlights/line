{View} = require 'atom'

module.exports =
class HighlightLineView extends View

  @content: ->
    @div class: 'highlight-view hidden', =>
      @div "Hidden to acitvate highlighted line"

  initialize: (serializeState) ->
    atom.workspaceView.append(this)

  # Returns an object that can be retrieved when package is activated
  serialize: ->
    # Nothing to serialize!

  # Tear down any state and detach
  destroy: ->
    @detach()
