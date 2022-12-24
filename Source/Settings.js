
const { config } = atom;


const Settings = {
    hideWhenSelecting : 'hideHighlightOnSelect' ,
    paintBackground : 'enableBackgroundColor' ,
    paintUnderline : 'enableUnderline' ,
    underlineStyle : 'underline' ,
    paintOverline : 'enableSelectionBorder'
}


const { defineProperty , entries } = Object;


for ( const [ name , setting ] of entries(Settings)){

    const get = () => config
        .get(`highlight-line.${ setting }`);

    defineProperty(exports,name,{ get })
}
