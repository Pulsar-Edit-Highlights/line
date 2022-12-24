
const { workspace , config } = atom;


const PackageId = 'highlight-line';


exports.marker = function ( range , styling ){

    let selector = PackageId;

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
