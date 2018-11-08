const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    description: String,
    name: {
        type: String, 
    },
    idMembers: [{
        type: mongoose.Schema.Types.ObjectId, 
        default: [],
        ref: 'User'
    }],
    idTeams: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    }],
    isPublic: {
        type: Boolean,
        default: true
    },
    idOwners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isClosed: { 
        type: Boolean, 
        default: false
    },
},
{
    timestamps: true
});

boardSchema.methods.isUserAllowed = function(idUser){
    return (
        this.isPublic ||
        this.idMembers.includes(idUser) ||
        this.owners.includes(idUser)
    );
};

module.exports = mongoose.model('Board', boardSchema);