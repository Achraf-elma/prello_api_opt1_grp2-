const mongoose = require('mongoose');


const checkListItemSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    isChecked: {
        type: Boolean, 
        required: true,
        default: false,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('CheckListItem', listSchema)