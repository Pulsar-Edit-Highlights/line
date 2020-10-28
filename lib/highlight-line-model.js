const { CompositeDisposable } = require('atom');

module.exports = class HighlightLineView {
  constructor() {
    this.destroy = this.destroy.bind(this);
    this.updateSelectedLine = this.updateSelectedLine.bind(this);
    this.showHighlight = this.showHighlight.bind(this);
    this.handleSingleLine = this.handleSingleLine.bind(this);
    this.handleMultiLine = this.handleMultiLine.bind(this);
    this.createDecoration = this.createDecoration.bind(this);
    this.observeSettings = this.observeSettings.bind(this);
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.workspace.observeTextEditors(activeEditor => {
        activeEditor.onDidAddSelection(this.updateSelectedLine);
        activeEditor.onDidChangeSelectionRange(this.updateSelectedLine);
        return activeEditor.onDidRemoveSelection(this.updateSelectedLine);
      })
    );
    this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem(this.updateSelectedLine));

    this.markers = [];
    this.observeSettings();
    this.updateSelectedLine();
  }

  static getEditor() {
    return atom.workspace.getActiveTextEditor();
  }

  // Tear down any state and detach
  destroy() {
    this.subscriptions.dispose();
  }

  updateSelectedLine() {
    this.resetBackground();
    this.showHighlight();
  }

  resetBackground() {
    Array.from(this.markers).forEach(decoration => {
      decoration.destroy();
    });

    this.markers = [];
  }

  showHighlight() {
    if (!HighlightLineView.getEditor()) {
      return;
    }
    this.handleMultiLine();
    this.handleSingleLine();
  }

  handleSingleLine() {
    Array.from(HighlightLineView.getEditor().getSelections()).forEach(selection => {
      if (selection.isSingleScreenLine()) {
        const selectionRange = selection.getBufferRange();
        if (
          selection.getText() === '' ||
          !atom.config.get('highlight-line.hideHighlightOnSelect')
        ) {
          if (atom.config.get('highlight-line.enableBackgroundColor')) {
            this.createDecoration(selectionRange);
          }
        }

        if (atom.config.get('highlight-line.enableUnderline')) {
          const style = atom.config.get('highlight-line.underline');
          this.createDecoration(selectionRange, `-multi-line-${style}-bottom`);
        }
      }
    });
  }

  handleMultiLine() {
    if (!atom.config.get('highlight-line.enableSelectionBorder')) {
      return;
    }

    const selections = HighlightLineView.getEditor().getSelections();

    Array.from(selections).forEach(selection => {
      if (!selection.isSingleScreenLine()) {
        const selectionRange = selection.getBufferRange().copy();
        const topLine = selectionRange;
        const bottomLine = selectionRange.copy();

        topLine.end = topLine.start;
        bottomLine.start = bottomLine.end;
        if (bottomLine.start.column === 0) {
          bottomLine.start.row -= 1;
        }

        const style = atom.config.get('highlight-line.underline');

        this.createDecoration(topLine, `-multi-line-${style}-top`);
        this.createDecoration(bottomLine, `-multi-line-${style}-bottom`);
      }
    });
  }

  createDecoration(range, klassToAdd) {
    let klass = 'highlight-line';

    if (klassToAdd !== null && klassToAdd !== undefined) {
      klass += klassToAdd;
    }

    const marker = HighlightLineView.getEditor().markBufferRange(range);
    HighlightLineView.getEditor().decorateMarker(marker, { type: 'line', class: klass });

    this.markers.push(marker);
  }

  observeSettings() {
    this.subscriptions.add(
      atom.config.onDidChange('highlight-line.enableBackgroundColor', this.updateSelectedLine)
    );
    this.subscriptions.add(
      atom.config.onDidChange('highlight-line.hideHighlightOnSelect', this.updateSelectedLine)
    );
    this.subscriptions.add(
      atom.config.onDidChange('highlight-line.enableUnderline', this.updateSelectedLine)
    );
    this.subscriptions.add(
      atom.config.onDidChange('highlight-line.enableSelectionBorder', this.updateSelectedLine)
    );
  }
};
