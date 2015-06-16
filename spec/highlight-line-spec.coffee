path = require 'path'
{Range, Point} = require 'atom'
HighlightLine = require '../lib/highlight-line'

describe "Higlight line", ->
  [activationPromise, workspaceElement,
    editor, editorElement, highlightSelected] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    atom.project.setPaths([path.join(__dirname, 'fixtures')])

    waitsForPromise ->
      atom.workspace.open('sample.coffee')

    runs ->
      jasmine.attachToDOM(workspaceElement)
      editor = atom.workspace.getActiveTextEditor()
      editorElement = atom.views.getView(editor)

      activationPromise = atom.packages
        .activatePackage('highlight-line').then ({mainModule}) ->
          {highlightLine} = mainModule

    waitsForPromise ->
      activationPromise

  describe "when the view is loaded", ->
    it "does not attach to the view", ->
      expect(workspaceElement.querySelectorAll('.highlight-view'))
        .toHaveLength(0)

  describe "when the background color is enabled", ->
    beforeEach ->
      atom.config.set('highlight-line.enabledBackgroundColor', true)

    describe "when there is only one cursor", ->
      beforeEach ->
        range = new Range(new Point(8, 2), new Point(8, 2))
        editor.setSelectedBufferRange(range)

      it "adds the background class to the cursor line", ->
        expect(editorElement.shadowRoot
          .querySelectorAll('.cursor-line.highlight-line')
        ).toHaveLength(1)

      describe "when hide highlight on select is enabled", ->
        beforeEach ->
          atom.config.set('highlight-line.hideHighlightOnSelect', true)

        it "will have a highlight when there is no text selected", ->
          expect(editorElement.shadowRoot
            .querySelectorAll('.cursor-line.highlight-line')
          ).toHaveLength(1)

        it "won`t have a highlight when there is text selected", ->
          range = new Range(new Point(8, 2), new Point(8, 5))
          editor.setSelectedBufferRange(range)
          expect(editorElement.shadowRoot
            .querySelectorAll('.cursor-line.highlight-line')
          ).toHaveLength(0)

    describe "when underline is enabled", ->
      beforeEach ->
        atom.config.set('highlight-line.enableUnderline', true)

      describe "when solid settings has been set", ->
        beforeEach ->
          atom.config.set('highlight-line.underline', 'solid')
          range = new Range(new Point(8, 2), new Point(8, 2))
          editor.setSelectedBufferRange(range)

        it "adds an underline to the current line", ->
          expect(
            editorElement.shadowRoot.querySelectorAll(
              '.cursor-line.highlight-line-multi-line-solid-bottom'
            )
          ).toHaveLength(1)

        describe "when hide highlight on select is enabled", ->
          beforeEach ->
            atom.config.set('highlight-line.hideHighlightOnSelect', true)

          it "will still have a line", ->
            range = new Range(new Point(8, 2), new Point(8, 5))
            editor.setSelectedBufferRange(range)
            expect(
              editorElement.shadowRoot.querySelectorAll(
                '.line.highlight-line-multi-line-solid-bottom'
              )
            ).toHaveLength(1)

      describe "when dashed settings has been set", ->
        beforeEach ->
          atom.config.set('highlight-line.underline', 'dashed')
          range = new Range(new Point(8, 2), new Point(8, 2))
          editor.setSelectedBufferRange(range)

        it "adds an underline to the current line", ->
          expect(
            editorElement.shadowRoot.querySelectorAll(
              '.cursor-line.highlight-line-multi-line-dashed-bottom'
            )
          ).toHaveLength(1)

      describe "when dotted settings has been set", ->
        beforeEach ->
          atom.config.set('highlight-line.underline', 'dotted')
          range = new Range(new Point(8, 2), new Point(8, 2))
          editor.setSelectedBufferRange(range)

        it "adds an underline to the current line", ->
          expect(
            editorElement.shadowRoot.querySelectorAll(
              '.cursor-line.highlight-line-multi-line-dotted-bottom'
            )
          ).toHaveLength(1)

    describe "when there are two cursors", ->
      beforeEach ->
        range1 = new Range(new Point(8, 2), new Point(8, 2))
        range2 = new Range(new Point(10, 2), new Point(10, 2))
        editor.setSelectedBufferRanges([range1, range2])

      it 'adds the background class to the cursor line', ->
        expect(editorElement.shadowRoot
          .querySelectorAll('.cursor-line.highlight-line')
        ).toHaveLength(2)

    describe "when there is a multi row selection", ->
      beforeEach ->
        range = new Range(new Point(8, 2), new Point(10, 8))
        editor.setSelectedBufferRange(range)

      it "won`t add a highlight line class", ->
        expect(editorElement.shadowRoot
          .querySelectorAll('.cursor-line.highlight-line')
        ).toHaveLength(0)

      describe "when selection border is enabled", ->
        beforeEach ->
          atom.config.set('highlight-line.enableSelectionBorder', true)
          atom.config.set('highlight-line.underline', 'solid')
          range = new Range(new Point(8, 2), new Point(10, 8))
          editor.setSelectedBufferRange(range)

        it "will add highlights to the top and bottom", ->
          expect(editorElement.shadowRoot.querySelectorAll('.cursor-line
            .highlight-line-multi-line-solid-top
            .highlight-line-multi-line-solid-bottom'))
            .toHaveLength(0)
