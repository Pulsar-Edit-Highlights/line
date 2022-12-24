
const { marker , line } = require('./Marker');
const Settings = require('./Settings');

const { workspace } = atom;


const toContent = ( selection ) => [
    selection.isSingleScreenLine() ,
    selection.getBufferRange() ,
    selection.getText()
]

const selections = () => workspace
    .getActiveTextEditor()
    .getSelections()
    .map(toContent);


module.exports = function * (){

    const { hideWhenSelecting , paintUnderline ,
            paintBackground , paintOverline } = Settings;


    for ( const [ single , range , text ] of selections() ){

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
