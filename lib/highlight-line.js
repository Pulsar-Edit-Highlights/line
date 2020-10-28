/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {CompositeDisposable} = require("atom");
const HighlightLineModel = require('./highlight-line-model');

module.exports = {
  config: {
    enableBackgroundColor: {
      type: 'boolean',
      default: true
    },
    hideHighlightOnSelect: {
      type: 'boolean',
      default: false
    },
    enableUnderline: {
      type: 'boolean',
      default: false
    },
    enableSelectionBorder: {
      type: 'boolean',
      default: false
    },
    underline: {
      type: 'string',
      default: 'solid',
      enum: ['solid', 'dotted', 'dashed']
    }
  },
  line: null,
  subscriptions: null,

  activate() {
    this.line = new HighlightLineModel();

    // Setup to use the new composite disposables API for registering commands
    this.subscriptions = new CompositeDisposable;

    // Add the commands
    this.subscriptions.add(atom.commands.add("atom-workspace",
        {'highlight-line:toggle-background': () => this.toggleHighlight()})
    );
    this.subscriptions.add(atom.commands.add("atom-workspace", {
        'highlight-line:toggle-hide-highlight-on-select': 
        () => this.toggleHideHighlightOnSelect()
      }
    )
    );
    this.subscriptions.add(atom.commands.add("atom-workspace",
        {'highlight-line:toggle-underline': () => this.toggleUnderline()})
    );
    return this.subscriptions.add(atom.commands.add("atom-workspace",
        {'highlight-line:toggle-selection-borders': () => this.toggleSelectionBorders()})
    );
  },

  deactivate() {
    this.line.destroy();

    // Destroy the subscriptions as well
    this.subscriptions.dispose();
    return this.subscriptions = null;
  },

  toggleHighlight() {
    const current = atom.config.get('highlight-line.enableBackgroundColor');
    return atom.config.set('highlight-line.enableBackgroundColor', !current);
  },

  toggleHideHighlightOnSelect() {
    const current = atom.config.get('highlight-line.hideHighlightOnSelect');
    return atom.config.set('highlight-line.hideHighlightOnSelect', !current);
  },

  toggleUnderline() {
    const current = atom.config.get('highlight-line.enableUnderline');
    return atom.config.set('highlight-line.enableUnderline', !current);
  },

  toggleSelectionBorders() {
    const current = atom.config.get('highlight-line.enableSelectionBorder');
    return atom.config.set('highlight-line.enableSelectionBorder', !current);
  }
};
