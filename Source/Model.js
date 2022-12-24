
const { CompositeDisposable } = require('atom');
const { workspace , config } = atom;
const select = require('./Select');

const activeEditor = () =>
    workspace.getActiveTextEditor();


module.exports = class HighlightLineView {

    subscriptions = new CompositeDisposable;
    markers = [];


    constructor (){

        const update = () =>
            this.updateSelectedLine();


        const { subscriptions } = this;

        subscriptions.add(
            workspace.observeTextEditors((editor) => {
                editor.onDidChangeSelectionRange(update);
                editor.onDidRemoveSelection(update);
                editor.onDidAddSelection(update);
            }));

        subscriptions.add(
            workspace.onDidChangeActivePaneItem(update));


        this.observeSettings();
        this.updateSelectedLine();
    }


    // Tear down any state and detach

    destroy (){
        this.subscriptions.dispose();
    }


    updateSelectedLine (){
        this.resetBackground();
        this.showHighlight();
    }


    resetBackground (){

        for ( const marker of this.markers )
            marker.destroy();

        this.markers = [];
    }

    showHighlight (){

        if( ! activeEditor() )
            return;

        this.markers.push( ... select() );
    }


    observeSettings (){

        const { subscriptions } = this;

        const settings = [
            'highlight-line.enableBackgroundColor' ,
            'highlight-line.hideHighlightOnSelect' ,
            'highlight-line.enableSelectionBorder' ,
            'highlight-line.enableUnderline'
        ]

        for ( const setting of settings ){

            const listener = config
                .onDidChange(setting,() => this.updateSelectedLine());

            subscriptions.add(listener);
        }
    }
}
