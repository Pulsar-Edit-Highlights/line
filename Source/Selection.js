
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

const isMultiLine = ( selection ) =>
    ! isSingleLine(selection);

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



exports.multiLine = function * (){

    const paintBorders = config
        .get('highlight-line.enableSelectionBorder');

    if( ! paintBorders )
        return;

    const selections = workspace
        .getActiveTextEditor()
        .getSelections()
        .filter(isMultiLine)
        .map(toContent);

    for ( const [ range ] of selections ){

        const topLine = range.copy();
        const bottomLine = range.copy();

        [ topLine.end , bottomLine.start ] =
            [ topLine.start , bottomLine.end ];

        if(bottomLine.start.column === 0)
            bottomLine.start.row -= 1;

        const style = config
            .get('highlight-line.underline');


        yield marker(bottomLine,`-multi-line-${ style }-bottom`)
        yield marker(topLine,`-multi-line-${ style }-top`)
    }
}
