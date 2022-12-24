
const { CompositeDisposable } = require('atom');

const HighlightLineModel = require('./highlight-line-model');
const Configuration = require('./Configuration')
const Actions = require('./Actions')

const { commands , config } = atom;



function toggleSetting ( setting ){

	const opposite = !
		config.get(setting);

	config.set(setting,opposite);
}



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
