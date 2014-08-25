{View} = require 'atom'

lines = []
underlineStyles = ["solid","dotted","dashed"]
underlineStyleInUse = ''

module.exports =
class HighlightLineView extends View

  @content: ->
    @div class: 'highlight-view hidden'

  attach: ->
    atom.workspaceView.prependToBottom(this)

  initialize: ->
    atom.workspaceView.on 'selection:changed', @updateSelectedLine
    atom.workspaceView.on 'pane:active-item-changed', @updateSelectedLine

    @markers = []

    @updateUnderlineStyle()
    @observeSettings()
    @updateSelectedLine()

  getEditor: ->
    atom.workspace.getActiveEditor()

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
          "highlight-line.underline.#{underlineStyleInUse}", false)
    @updateUnderlineStyle()
    @updateSelectedLine()

  # Tear down any state and detach
  destroy: =>
    atom.workspaceView.off 'selection:changed', @updateSelectedLine
    @unsubscribe()
    @remove()
    @detach()

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

        if atom.config.get('highlight-line.enableUnderline') \
        and underlineStyleInUse
          @createDecoration(selectionRange,
            "-multi-line-#{underlineStyleInUse}-bottom")

  handleMultiLine: =>
    return unless atom.config.get('highlight-line.enableSelectionBorder')
    return unless underlineStyleInUse

    selections = @getEditor().getSelections()
    for selection in selections
      unless selection.isSingleScreenLine()
        selectionRange = selection.getBufferRange().copy()
        topLine = selectionRange
        bottomLine = selectionRange.copy()

        topLine.end = topLine.start
        bottomLine.start = bottomLine.end

        @createDecoration(topLine,
          "-multi-line-#{underlineStyleInUse}-top")
        @createDecoration(bottomLine,
          "-multi-line-#{underlineStyleInUse}-bottom")

  createDecoration: (range, klassToAdd = '') =>
    klass = 'highlight-line'
    klass += klassToAdd
    marker = @getEditor().markBufferRange(range)
    decoration = @getEditor()
      .decorateMarker(marker, {type: 'line', class: klass})

    @markers.push marker

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
      "highlight-line.hideHighlightOnSelect",
      callNow: false,
      @updateSelectedLine)
    @subscribe atom.config.observe(
      "highlight-line.enableUnderline",
      callNow: false,
      @updateSelectedLine)
    @subscribe atom.config.observe(
      "highlight-line.enableSelectionBorder",
      callNow: false,
      @updateSelectedLine)
