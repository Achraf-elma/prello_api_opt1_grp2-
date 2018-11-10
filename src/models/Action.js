const mongoose = require('mongoose');

const actionSchema = mongoose.Schema({
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    idBoard: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Board',
        required: true,
    },
    //The data involved for an action: for instance --> card, list, board
    data: [{
        type: Object,
    }],
    type: String
},
{
    timestamps: true
});

module.exports = mongoose.model('Action', actionSchema);