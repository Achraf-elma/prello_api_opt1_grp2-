const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
    name: String,
    desc: String,
    website: String,
    idMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    idOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    });

organizationSchema.methods.isUserAllowed = function (idUser) {
    return (
        this.idMembers.find(member => member.equals(idUser) ||  member._id.equals(idUser)) ||
        this.idOwner.equals(idUser)
    );
};

// Duplicate the ID field.
organizationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
organizationSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Organization', organizationSchema)