
const { CompositeDisposable } = require('atom');

const HighlightLineModel = require('./highlight-line-model');

const { commands , config } = atom;



function toggleSetting ( setting ){

	const opposite = !
		config.get(setting);

	config.set(setting,opposite);
}


const Configuration = {

	enableBackgroundColor : {
		default : true ,
		type : 'boolean'
	},

	hideHighlightOnSelect : {
		default : false ,
		type : 'boolean'
	},

	enableSelectionBorder : {
		default : false ,
		type : 'boolean'
	},

	enableUnderline : {
		default : false ,
		type : 'boolean'
	},

	underline : {
		default : 'solid' ,
		type : 'string' ,
		enum : [ 'solid' , 'dotted' , 'dashed' ]
	}
}


const Actions = [
	[ 'highlight-line:toggle-hide-highlight-on-select' , 'highlight-line.hideHighlightOnSelect' ] ,
	[ 'highlight-line:toggle-selection-borders' , 'highlight-line.enableSelectionBorder' ] ,
	[ 'highlight-line:toggle-background' , 'highlight-line.enableBackgroundColor' ] ,
	[ 'highlight-line:toggle-underline' , 'highlight-line.enableUnderline' ]
]


module.exports = {

	subscriptions : null ,
	config : Configuration ,
	line : null ,


	activate (){

		this.line = new HighlightLineModel();

		// Setup to use the new composite disposables API for registering commands

		this.subscriptions = new CompositeDisposable();

		// Add the commands

		const { subscriptions } = this;

		for ( const [ toggle , setting ] of Actions ){

			const action = { [ toggle ] : () => toggleSetting(setting) };

			const command = commands.add('atom-workspace',action);

			subscriptions.add(command);
		}
	},


	deactivate() {

		const { subscriptions , line } = this;

		line.destroy();

		subscriptions.dispose();
		this.subscriptions = null;
	}
}
