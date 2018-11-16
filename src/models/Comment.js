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
    idMember: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    fullName: {
        type: String,
        default: 'User'
    },
    isClosed: { 
        type: Boolean, 
        default: false
    }
},
{
    timestamps: true
});

// Duplicate the ID field.
commentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
commentSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Comment', commentSchema);