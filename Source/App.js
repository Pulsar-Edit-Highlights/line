
const
    { CompositeDisposable } = require('atom') ,
    HighlightLineModel = require('./Model') ,
    Commands = require('./Commands') ;



module.exports = {

    subscriptions : null ,
    line : null ,


    activate (){

        this.subscriptions = new CompositeDisposable;
        this.line = new HighlightLineModel;

        this.subscriptions.add(
            ... Commands.register() );
    },


    deactivate (){

        const { subscriptions , line } = this;

        line.destroy();

        subscriptions.dispose();
        this.subscriptions = null;
    }
}
