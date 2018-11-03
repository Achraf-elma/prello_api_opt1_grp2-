const mongoose = require('mongoose');

const checkListSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    checkListItems: [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
    }]
},
{
    timestamps: true
});

module.exports = mongoose.model('CheckList', listSchema);