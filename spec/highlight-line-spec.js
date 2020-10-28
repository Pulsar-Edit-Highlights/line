/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const path = require('path');
const {Range, Point} = require('atom');
const HighlightLine = require('../lib/highlight-line');

describe("Higlight line", function() {
  let [activationPromise, workspaceElement,
    editor, editorElement, highlightSelected] = Array.from([]);

  beforeEach(function() {
    workspaceElement = atom.views.getView(atom.workspace);
    atom.project.setPaths([path.join(__dirname, 'fixtures')]);

    waitsForPromise(() => atom.workspace.open('sample.coffee'));

    runs(function() {
      jasmine.attachToDOM(workspaceElement);
      editor = atom.workspace.getActiveTextEditor();
      editorElement = atom.views.getView(editor);

      return activationPromise = atom.packages
        .activatePackage('highlight-line').then(function({mainModule}) {
          let highlightLine;
          return ({highlightLine} = mainModule);
      });
    });

    return waitsForPromise(() => activationPromise);
  });

  describe("when the view is loaded", () => it("does not attach to the view", () => expect(workspaceElement.querySelectorAll('.highlight-view'))
    .toHaveLength(0)));

  return describe("when the background color is enabled", function() {
    beforeEach(() => atom.config.set('highlight-line.enabledBackgroundColor', true));

    describe("when there is only one cursor", function() {
      beforeEach(function() {
        const range = new Range(new Point(8, 2), new Point(8, 2));
        return editor.setSelectedBufferRange(range);
      });

      it("adds the background class to the cursor line", () => expect(
        editorElement.querySelectorAll('.cursor-line.highlight-line')
      ).toHaveLength(1));

      return describe("when hide highlight on select is enabled", function() {
        beforeEach(() => atom.config.set('highlight-line.hideHighlightOnSelect', true));

        it("will have a highlight when there is no text selected", () => expect(editorElement
          .querySelectorAll('.cursor-line.highlight-line')
        ).toHaveLength(1));

        return it("won`t have a highlight when there is text selected", function() {
          const range = new Range(new Point(8, 2), new Point(8, 5));
          editor.setSelectedBufferRange(range);
          return expect(editorElement
            .querySelectorAll('.cursor-line.highlight-line')
          ).toHaveLength(0);
        });
      });
    });

    describe("when underline is enabled", function() {
      beforeEach(() => atom.config.set('highlight-line.enableUnderline', true));

      describe("when solid settings has been set", function() {
        beforeEach(function() {
          atom.config.set('highlight-line.underline', 'solid');
          const range = new Range(new Point(8, 2), new Point(8, 2));
          return editor.setSelectedBufferRange(range);
        });

        it("adds an underline to the current line", () => expect(
          editorElement.querySelectorAll(
            '.cursor-line.highlight-line-multi-line-solid-bottom'
          )
        ).toHaveLength(1));

        return describe("when hide highlight on select is enabled", function() {
          beforeEach(() => atom.config.set('highlight-line.hideHighlightOnSelect', true));

          return it("will still have a line", function() {
            const range = new Range(new Point(8, 2), new Point(8, 5));
            editor.setSelectedBufferRange(range);
            return expect(
              editorElement.querySelectorAll(
                '.line.highlight-line-multi-line-solid-bottom'
              )
            ).toHaveLength(1);
          });
        });
      });

      describe("when dashed settings has been set", function() {
        beforeEach(function() {
          atom.config.set('highlight-line.underline', 'dashed');
          const range = new Range(new Point(8, 2), new Point(8, 2));
          return editor.setSelectedBufferRange(range);
        });

        return it("adds an underline to the current line", () => expect(
          editorElement.querySelectorAll(
            '.cursor-line.highlight-line-multi-line-dashed-bottom'
          )
        ).toHaveLength(1));
      });

      return describe("when dotted settings has been set", function() {
        beforeEach(function() {
          atom.config.set('highlight-line.underline', 'dotted');
          const range = new Range(new Point(8, 2), new Point(8, 2));
          return editor.setSelectedBufferRange(range);
        });

        return it("adds an underline to the current line", () => expect(
          editorElement.querySelectorAll(
            '.cursor-line.highlight-line-multi-line-dotted-bottom'
          )
        ).toHaveLength(1));
      });
    });

    describe("when there are two cursors", function() {
      beforeEach(function() {
        const range1 = new Range(new Point(8, 2), new Point(8, 2));
        const range2 = new Range(new Point(10, 2), new Point(10, 2));
        return editor.setSelectedBufferRanges([range1, range2]);
      });

      return it('adds the background class to the cursor line', () => expect(
        editorElement.querySelectorAll('.cursor-line.highlight-line')
      ).toHaveLength(2));
    });

    return describe("when there is a multi row selection", function() {
      beforeEach(function() {
        const range = new Range(new Point(8, 2), new Point(10, 8));
        return editor.setSelectedBufferRange(range);
      });

      it("won`t add a highlight line class", () => expect(
        editorElement.querySelectorAll('.cursor-line.highlight-line')
      ).toHaveLength(0));

      return describe("when selection border is enabled", function() {
        beforeEach(function() {
          atom.config.set('highlight-line.enableSelectionBorder', true);
          atom.config.set('highlight-line.underline', 'solid');
          const range = new Range(new Point(8, 2), new Point(10, 8));
          return editor.setSelectedBufferRange(range);
        });

        return it("will add highlights to the top and bottom", () => expect(editorElement.querySelectorAll(`.cursor-line \
.highlight-line-multi-line-solid-top \
.highlight-line-multi-line-solid-bottom`))
          .toHaveLength(0));
      });
    });
  });
});
