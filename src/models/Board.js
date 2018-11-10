const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    description: String,
    name: {
        type: String, 
    },
    idMembers: [{
        type: mongoose.Schema.Types.ObjectId, 
        default: [],
        //ref: 'User'
    }],
    idOrganizations: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Organization'
    }],
    isPublic: {
        type: Boolean,
        default: true
    },
    idOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
        this.idOwner === (idUser)
    );
};

module.exports = mongoose.model('Board', boardSchema);