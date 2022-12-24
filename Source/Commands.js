
const Actions = require('./Actions');

const { commands , config } = atom;



function toggle ( setting ){

    const opposite = !
        config.get(setting);

    config.set(setting,opposite);
}


const registerAction = ([ action , setting ]) =>
    commands.add('atom-workspace',{
        [ action ] : () => toggle(setting)
    });


function * register (){

    for ( const action of Actions )
        yield registerAction(action)
}



module.exports = { register }
