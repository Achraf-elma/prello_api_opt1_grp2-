const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    description: String,
    name: {
        type: String, 
        required: true
    },
    idMembers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    idTeams: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    }],
    isPublic: [{
        type: Boolean,
        required: true,
        default: true
    }],
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    }],
    isClosed: { 
        type: Boolean, 
        required: true, 
        default: false
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Board', boardSchema);