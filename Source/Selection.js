
const { workspace , config } = atom;


const PackageId = 'highlight-line';


function marker ( range , styling ){

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



const isSingleLine = ( selection ) =>
    selection.isSingleScreenLine();

const toContent = ( selection ) => [
    selection.getBufferRange() ,
    selection.getText()
]


exports.singleLine = function * (){

    const hideWhenSelecting = config
        .get('highlight-line.hideHighlightOnSelect');

    const paintBackground = config
        .get('highlight-line.enableBackgroundColor');

    const paintUnderline = config
        .get('highlight-line.enableUnderline');

    const underlineStyle = config
        .get('highlight-line.underline');


    const selections = workspace
        .getActiveTextEditor()
        .getSelections()
        .filter(isSingleLine)
        .map(toContent);


    for ( const [ range , text ] of selections ){

        if( paintBackground && ( text === '' || ! hideWhenSelecting ) )
            yield marker(range);

        if( paintUnderline)
            yield marker(range,`-multi-line-${ underlineStyle }-bottom`);
    }
}


exports.marker = marker;
