const mongoose = require('mongoose');

const checkListSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    checkListItems: [{
        type: Object
    }],
    idCard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    },
    idBoard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('CheckList', checkListSchema);