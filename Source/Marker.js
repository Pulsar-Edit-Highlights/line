
const Settings = require('./Settings');

const { workspace } = atom;



function marker ( range , styling ){

    let selector = 'highlight-line';

    if( styling )
        selector += styling;


    const editor = workspace
        .getActiveTextEditor();

    const marker = editor
        .markBufferRange(range);

    editor.decorateMarker(marker,{
        class : selector ,
        type : 'line'
    })

    return marker
}


function line ( range , type ){

    const { underlineStyle } = Settings;

    return marker(range,`-multi-line-${ underlineStyle }-${ type }`);
}


module.exports = { marker , line }
