const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
    displayName: String,
    desc: String,
    website: String,
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

module.exports = mongoose.model('Organization', organizationSchema)