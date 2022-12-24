

const Id = 'highlight-line';


const Actions = {
    'toggle-hide-highlight-on-select' : 'hideHighlightOnSelect' ,
    'toggle-selection-borders' : 'enableSelectionBorder' ,
    'toggle-background' : 'enableBackgroundColor' ,
    'toggle-underline' : 'enableUnderline'
}


const toCommand = ( name ) =>
    `${ Id }:${ name }`

const toSetting = ( name ) =>
    `${ Id }.${ name }`


const toAction = ([ command , setting ]) =>
    [ toCommand(command) , toSetting(setting) ]


module.exports = Object
    .entries(Actions)
    .map(toAction)
