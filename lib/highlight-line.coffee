{CompositeDisposable} = require "atom"
HighlightLineView = require './highlight-line-view'

module.exports =
  config:
    enableBackgroundColor:
      type: 'boolean'
      default: true
    hideHighlightOnSelect:
      type: 'boolean'
      default: false
    enableUnderline:
      type: 'boolean'
      default: false
    enableSelectionBorder:
      type: 'boolean'
      default: false
    underline:
      type: 'string'
      default: 'solid'
      enum: ['solid', 'dotted', 'dashed']
  line: null
  subscriptions: null

  activate: ->
    @line = new HighlightLineView()
    @line.attach()

    # Setup to use the new composite disposables API for registering commands
    @subscriptions = new CompositeDisposable

    # Add the commands
    @subscriptions.add atom.commands.add "atom-workspace",
        'highlight-line:toggle-background': => @toggleHighlight()
        'highlight-line:toggle-hide-highlight-on-select': => @toggleHideHighlightOnSelect()
        'highlight-line:toggle-underline': => @toggleUnderline()
        'highlight-line:toggle-selection-borders': => @toggleSelectionBorders()

    # atom.workspaceView.command(
    #   'highlight-line:toggle-background', '.editor', =>
    #     @toggleHighlight()
    # )
    # atom.workspaceView.command(
    #   'highlight-line:toggle-hide-highlight-on-select', '.editor', =>
    #     @toggleHideHighlightOnSelect()
    # )
    # atom.workspaceView.command(
    #   'highlight-line:toggle-underline', '.editor', =>
    #     @toggleUnderline()
    # )
    # atom.workspaceView.command(
    #   'highlight-line:toggle-selection-borders', '.editor', =>
    #     @toggleSelectionBorders()
    # )

  deactivate: ->
    @line.destroy()

    # Destroy the subscriptions as well
    @subscriptions.dispose()
    @subscriptions = null

    # atom.workspaceView.off 'highlight-line:toggle-background'
    # atom.workspaceView.off 'highlight-line:toggle-underline'
    # atom.workspaceView.off 'highlight-line:toggle-selection-borders'

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
