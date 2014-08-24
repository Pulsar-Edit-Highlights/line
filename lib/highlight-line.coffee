HighlightLineView = require './highlight-line-view'

module.exports =
  configDefaults:
    enableBackgroundColor: true
    hideHighlightOnSelect: false
    enableUnderline: false
    enableSelectionBorder: false
    underline:
      solid: true
      dotted: false
      dashed: false
  line: null

  activate: ->
    @line = new HighlightLineView()
    @line.attach()

    atom.workspaceView.command(
      'highlight-line:toggle-background', '.editor', =>
        @toggleHighlight()
    )
    atom.workspaceView.command(
      'highlight-line:toggle-hide-highlight-on-select', '.editor', =>
        @toggleHideHighlightOnSelect()
    )
    atom.workspaceView.command(
      'highlight-line:toggle-underline', '.editor', =>
        @toggleUnderline()
    )
    atom.workspaceView.command(
      'highlight-line:toggle-selection-borders', '.editor', =>
        @toggleSelectionBorders()
    )

  deactivate: ->
    @line.destroy()
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
