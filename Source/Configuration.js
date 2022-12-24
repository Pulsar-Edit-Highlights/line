
module.exports = {

    enableBackgroundColor : {
        default : true ,
        type : 'boolean'
    },

    hideHighlightOnSelect : {
        default : false ,
        type : 'boolean'
    },

    enableSelectionBorder : {
        default : false ,
        type : 'boolean'
    },

    enableUnderline : {
        default : false ,
        type : 'boolean'
    },

    underline : {
        default : 'solid' ,
        enum : [ 'solid' , 'dotted' , 'dashed' ] ,
        type : 'string'
    }
}
