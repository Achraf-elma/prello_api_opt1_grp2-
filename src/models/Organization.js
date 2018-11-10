const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
    displayName: String,
    desc: String,
    website: String,
    idMembers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    idAdmin: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
},
{
    timestamps: true
});

organizationSchema.methods.isUserAllowed = function(idUser){
    return (
        this.idMembers.includes(idUser) ||
        this.idAdmin === idUser
    );
};

module.exports = mongoose.model('Organization', organizationSchema)