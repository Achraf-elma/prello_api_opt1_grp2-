const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    description: String,
    name: {
        type: String, 
        required: true
    },
    dueDate: Date,
    //whether the card has be checked as "done" or not
    dueComplete: { 
        type: Boolean, 
        required: true, 
        default: false
    },
    idBoard: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Board'
    }],
    idList: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'List'
    }],
    idMembers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    idCheckLists: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CheckList'
    }],
    labels: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Label'
    }],
    isClosed: { 
        type: Boolean, 
        required: true, 
        default: false
    },
    position: Number
},
{
    timestamps: true
});

module.exports = mongoose.model('Card', cardSchema)