const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    displayName: String,
    desc: String,
    idBoards: [String],
    idMembers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    idAdmins: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
},
{
    timestamps: true
});

module.exports = mongoose.model('Team', teamSchema)