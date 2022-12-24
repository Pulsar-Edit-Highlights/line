
const { CompositeDisposable } = require('atom');
const { workspace , config } = atom;


module.exports = class HighlightLineView {

	markers = [];

	constructor (){

		this.updateSelectedLine = this.updateSelectedLine.bind(this);
		this.handleSingleLine = this.handleSingleLine.bind(this);
		this.createDecoration = this.createDecoration.bind(this);
		this.handleMultiLine = this.handleMultiLine.bind(this);
		this.observeSettings = this.observeSettings.bind(this);
		this.showHighlight = this.showHighlight.bind(this);
		this.destroy = this.destroy.bind(this);


		this.subscriptions = new CompositeDisposable();


		const { updateSelectedLine , subscriptions } = this;

		subscriptions.add(
			workspace.observeTextEditors((editor) => {
				editor.onDidAddSelection(updateSelectedLine);
				editor.onDidChangeSelectionRange(updateSelectedLine);
				return editor.onDidRemoveSelection(updateSelectedLine);
			}));

		subscriptions.add(
			workspace.onDidChangeActivePaneItem(updateSelectedLine));

		this.observeSettings();
		this.updateSelectedLine();
	}


	static getEditor (){
		return workspace.getActiveTextEditor();
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

		if( ! HighlightLineView.getEditor() )
			return;

		this.handleMultiLine();
		this.handleSingleLine();
	}


	handleSingleLine (){

		const selections = HighlightLineView
			.getEditor()
			.getSelections();

		for ( const selection of selections ){

			if( ! selection.isSingleScreenLine() )
				return

			const selectionRange = selection
				.getBufferRange();

			if(selection.getText() === '' || ! config.get('highlight-line.hideHighlightOnSelect'))
				if(config.get('highlight-line.enableBackgroundColor'))
					this.createDecoration(selectionRange);

			if(config.get('highlight-line.enableUnderline')){
				const style = config.get('highlight-line.underline');
				this.createDecoration(selectionRange, `-multi-line-${style}-bottom`);
			}
		}
	}


	handleMultiLine (){

		if( ! config.get('highlight-line.enableSelectionBorder') )
			return;

		const selections = HighlightLineView
			.getEditor()
			.getSelections();

		for ( const selection of selections ){

			if(selection.isSingleScreenLine())
				return

			const selectionRange = selection
				.getBufferRange()
				.copy();

			const topLine = selectionRange;
			const bottomLine = selectionRange.copy();

			[ topLine.end , bottomLine.start ] =
				[ topLine.start , bottomLine.end ];

			if(bottomLine.start.column === 0)
				bottomLine.start.row -= 1;

			const style = config
				.get('highlight-line.underline');

			this.createDecoration(topLine,`-multi-line-${ style }-top`);
			this.createDecoration(bottomLine,`-multi-line-${ style }-bottom`);
		}
	}


	createDecoration ( range , className ){

		let classes = 'highlight-line';

		if(className)
			classes += className;

		const editor = HighlightLineView
			.getEditor();

		const marker = editor
			.markBufferRange(range);

		editor.decorateMarker(marker,{
			class : classes ,
			type : 'line'
		});

		this.markers.push(marker);
	}


	observeSettings (){

		const { subscriptions } = this;

		subscriptions.add(config.onDidChange('highlight-line.enableBackgroundColor',this.updateSelectedLine));
		subscriptions.add(config.onDidChange('highlight-line.hideHighlightOnSelect',this.updateSelectedLine));
		subscriptions.add(config.onDidChange('highlight-line.enableSelectionBorder',this.updateSelectedLine));
		subscriptions.add(config.onDidChange('highlight-line.enableUnderline',this.updateSelectedLine));
	}
}
