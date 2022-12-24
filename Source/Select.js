
const { workspace } = atom;
const Settings = require('./Settings')


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

function line ( range , type ){

    const { underlineStyle } = Settings;

    return marker(range,`-multi-line-${ underlineStyle }-${ type }`);
}



const toContent = ( selection ) => [
    selection.isSingleScreenLine() ,
    selection.getBufferRange() ,
    selection.getText()
]


module.exports = function * (){

    const { hideWhenSelecting , paintUnderline ,
            paintBackground , underlineStyle ,
            paintOverline } = Settings;


    const selections = workspace
        .getActiveTextEditor()
        .getSelections()
        .map(toContent);


    for ( const [ single , range , text ] of selections ){

        if( single ){

            if( paintUnderline)
                yield line(range,'bottom');

            if( ! paintBackground )
                continue

            if( text.length && hideWhenSelecting )
                continue

            yield marker(range);

            continue
        }

        if( ! paintOverline )
            continue

        const [ bottom , top ] =
            [ range.copy() , range.copy() ];

        bottom.start = bottom.end;
        top.end = top.start;

        if(bottom.start.column === 0)
            bottom.start.row -= 1;

        yield line(bottom,'bottom');
        yield line(top,'top');
    }
}
