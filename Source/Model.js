
const { CompositeDisposable } = require('atom');
const { workspace , config } = atom;
const { singleLine , multiLine } = require('./Selection');

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

        this.markers.push( ... multiLine() );
        this.markers.push( ... singleLine() );
    }

    // handleMultiLine (){

    //     if( ! config.get('highlight-line.enableSelectionBorder') )
    //         return;

    //     const selections = activeEditor()
    //         .getSelections();

    //     for ( const selection of selections ){

    //         if(selection.isSingleScreenLine())
    //             return

    //         const selectionRange = selection
    //             .getBufferRange()
    //             .copy();

    //         const topLine = selectionRange;
    //         const bottomLine = selectionRange.copy();

    //         [ topLine.end , bottomLine.start ] =
    //             [ topLine.start , bottomLine.end ];

    //         if(bottomLine.start.column === 0)
    //             bottomLine.start.row -= 1;

    //         const style = config
    //             .get('highlight-line.underline');


    //         this.markers.push(
    //             marker(bottomLine,`-multi-line-${ style }-bottom`) ,
    //             marker(topLine,`-multi-line-${ style }-top`)
    //         )
    //     }
    // }


    // createDecoration ( range , className ){

    //     let classes = 'highlight-line';

    //     if(className)
    //         classes += className;

    //     const editor = activeEditor();

    //     const marker = editor
    //         .markBufferRange(range);

    //     editor.decorateMarker(marker,{
    //         class : classes ,
    //         type : 'line'
    //     });

    //     this.markers.push(marker);
    // }


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
