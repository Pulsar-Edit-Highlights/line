{View} = require 'atom'

module.exports =
class HighlightLineView extends View

  initialize: (serializeState) ->
    atom.workspaceView.append(this)

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()
