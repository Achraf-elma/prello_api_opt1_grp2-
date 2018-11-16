const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    date: Date,
    text: {
        type: String,
    },
    idCard: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Card'
    },
    idAuthor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    idMembersInvolded: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    isClosed: { 
        type: Boolean, 
        default: false
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);