const { CompositeDisposable } = require('atom');

const { config } = atom;


module.exports = class HighlightLineView {

	markers = [];

	constructor (){

		this.destroy = this.destroy.bind(this);
		this.updateSelectedLine = this.updateSelectedLine.bind(this);
		this.showHighlight = this.showHighlight.bind(this);
		this.handleSingleLine = this.handleSingleLine.bind(this);
		this.handleMultiLine = this.handleMultiLine.bind(this);
		this.createDecoration = this.createDecoration.bind(this);
		this.observeSettings = this.observeSettings.bind(this);
		this.subscriptions = new CompositeDisposable();

		this.subscriptions.add(
			atom.workspace.observeTextEditors((activeEditor) => {
				activeEditor.onDidAddSelection(this.updateSelectedLine);
				activeEditor.onDidChangeSelectionRange(this.updateSelectedLine);
				return activeEditor.onDidRemoveSelection(this.updateSelectedLine);
			})
		);

		this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem(this.updateSelectedLine));

		this.observeSettings();
		this.updateSelectedLine();
	}


	static getEditor (){
		return atom.workspace.getActiveTextEditor();
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

		Array
		.from(this.markers)
		.forEach((decoration) => decoration.destroy());

		this.markers = [];
	}

	showHighlight (){

		if( ! HighlightLineView.getEditor() )
			return;

		this.handleMultiLine();
		this.handleSingleLine();
	}


	handleSingleLine (){

		Array
		.from(HighlightLineView.getEditor().getSelections())
		.forEach((selection) => {

			if( ! selection.isSingleScreenLine())
				return;

			const selectionRange = selection.getBufferRange();

			if(selection.getText() === '' || ! config.get('highlight-line.hideHighlightOnSelect'))
				if(config.get('highlight-line.enableBackgroundColor'))
					this.createDecoration(selectionRange);

			if(config.get('highlight-line.enableUnderline')){
				const style = config.get('highlight-line.underline');
				this.createDecoration(selectionRange, `-multi-line-${style}-bottom`);
			}
		});
	}


	handleMultiLine (){

		if(!atom.config.get('highlight-line.enableSelectionBorder'))
			return;

		const selections = HighlightLineView
			.getEditor()
			.getSelections();

		Array
		.from(selections)
		.forEach((selection) => {

			if(selection.isSingleScreenLine())
				return;

			const selectionRange = selection
				.getBufferRange()
				.copy();

			const topLine = selectionRange;
			const bottomLine = selectionRange.copy();

			topLine.end = topLine.start;
			bottomLine.start = bottomLine.end;

			if(bottomLine.start.column === 0)
				bottomLine.start.row -= 1;

			const style = config
				.get('highlight-line.underline');

			this.createDecoration(topLine,`-multi-line-${ style }-top`);
			this.createDecoration(bottomLine,`-multi-line-${ style }-bottom`);
		});
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
