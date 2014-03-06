{View} = require 'atom'
{$} = require 'atom'

module.exports =
class HighlightLineView extends View

  @content: ->
    @div class: 'highlight-view hidden'

  initialize: (serializeState) ->
    @defaultBgColor = "100, 100, 100"
    @defaultOpacity = 50
    atom.workspaceView.eachPaneView (paneView) =>
      paneView.on "selection:changed", @handleSelection

  # Returns an object that can be retrieved when package is activated
  serialize: ->
    # Nothing to serialize!

  # Tear down any state and detach
  destroy: ->
    atom.workspaceView.eachPaneView (paneView) ->
      paneView.off "selection:changed"
    @detach()

  handleSelection: =>
    if atom.config.get('highlight-line.enable')
      wantedColor = atom.config.get('highlight-line.backgroundRgaColor')
      if wantedColor?.split(',').length isnt 3
        wantedColor = @defaultBgColor
      wantedOpacity = atom.config.get('highlight-line.opacity')
      if wantedOpacity
        wantedOpacity = parseFloat(wantedOpacity)
      else
        wantedOpacity = @defaultOpacity

      if wantedOpacity isnt 100
        wantedOpacity = "0.#{wantedOpacity}"

      $('.line').css('background-color', '')

      rgba = "rgba(#{wantedColor}, #{wantedOpacity})"
      $('.line.cursor-line').attr('style', "background-color: #{rgba}")
    else
      $('.line').css('background-color', '')
