/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let HighlightLineView;
const {CompositeDisposable} = require('atom');
const {Point} = require('atom');

const lines = [];

module.exports =
(HighlightLineView = class HighlightLineView {

  constructor() {
    this.destroy = this.destroy.bind(this);
    this.updateSelectedLine = this.updateSelectedLine.bind(this);
    this.showHighlight = this.showHighlight.bind(this);
    this.handleSingleLine = this.handleSingleLine.bind(this);
    this.handleMultiLine = this.handleMultiLine.bind(this);
    this.createDecoration = this.createDecoration.bind(this);
    this.observeSettings = this.observeSettings.bind(this);
    this.subscriptions = new CompositeDisposable;

    this.subscriptions.add(atom.workspace.observeTextEditors(activeEditor => {
      activeEditor.onDidAddSelection(this.updateSelectedLine);
      activeEditor.onDidChangeSelectionRange(this.updateSelectedLine);
      return activeEditor.onDidRemoveSelection(this.updateSelectedLine);
    }));
    this.subscriptions.add(
      atom.workspace.onDidChangeActivePaneItem(this.updateSelectedLine)
    );

    this.markers = [];
    this.observeSettings();
    this.updateSelectedLine();
  }

  getEditor() {
    return atom.workspace.getActiveTextEditor();
  }

  // Tear down any state and detach
  destroy() {
    return this.subscriptions.dispose();
  }

  updateSelectedLine() {
    this.resetBackground();
    return this.showHighlight();
  }

  resetBackground() {
    for (let decoration of Array.from(this.markers)) {
      decoration.destroy();
      decoration = null;
    }
    return this.markers = [];
  }

  showHighlight() {
    if (!this.getEditor()) { return; }
    this.handleMultiLine();
    return this.handleSingleLine();
  }

  handleSingleLine() {
    return (() => {
      const result = [];
      for (let selection of Array.from(this.getEditor().getSelections())) {
        if (selection.isSingleScreenLine()) {
          const selectionRange = selection.getBufferRange();
          if ((selection.getText() === '')
          || !atom.config.get("highlight-line.hideHighlightOnSelect")) {
            if (atom.config.get('highlight-line.enableBackgroundColor')) {
              this.createDecoration(selectionRange);
            }
          }

          if (atom.config.get('highlight-line.enableUnderline')) {
            const style = atom.config.get("highlight-line.underline");
            result.push(this.createDecoration(selectionRange,
              `-multi-line-${style}-bottom`));
          } else {
            result.push(undefined);
          }
        } else {
          result.push(undefined);
        }
      }
      return result;
    })();
  }

  handleMultiLine() {
    if (!atom.config.get('highlight-line.enableSelectionBorder')) { return; }

    const selections = this.getEditor().getSelections();
    return (() => {
      const result = [];
      for (let selection of Array.from(selections)) {
        if (!selection.isSingleScreenLine()) {
          const selectionRange = selection.getBufferRange().copy();
          const topLine = selectionRange;
          const bottomLine = selectionRange.copy();

          topLine.end = topLine.start;
          bottomLine.start = bottomLine.end;
          if (bottomLine.start.column === 0) {
            bottomLine.start.row -= 1;
          }

          const style = atom.config.get("highlight-line.underline");

          this.createDecoration(topLine,
            `-multi-line-${style}-top`);
          result.push(this.createDecoration(bottomLine,
            `-multi-line-${style}-bottom`));
        } else {
          result.push(undefined);
        }
      }
      return result;
    })();
  }

  createDecoration(range, klassToAdd) {
    if (klassToAdd == null) { klassToAdd = ''; }
    let klass = 'highlight-line';
    klass += klassToAdd;
    const marker = this.getEditor().markBufferRange(range);
    const decoration = this.getEditor()
      .decorateMarker(marker, {type: 'line', class: klass});

    return this.markers.push(marker);
  }

  observeSettings() {
    this.subscriptions.add(atom.config.onDidChange(
      "highlight-line.enableBackgroundColor", this.updateSelectedLine)
    );
    this.subscriptions.add(atom.config.onDidChange(
      "highlight-line.hideHighlightOnSelect", this.updateSelectedLine)
    );
    this.subscriptions.add(atom.config.onDidChange(
      "highlight-line.enableUnderline", this.updateSelectedLine)
    );
    return this.subscriptions.add(atom.config.onDidChange(
      "highlight-line.enableSelectionBorder", this.updateSelectedLine)
    );
  }
});
