const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    desc: String,
    name: {
        type: String,
    },
    idMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'User'
    }],
    labelNames: {
        type: Object,
        default: {
            "green": "todo",
            "yellow": "",
            "orange": "",
            "red": "",
            "purple": "",
            "blue": "",
            "sky": "",
            "lime": "",
            "pink": "",
            "black": ""
        }
    },
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
        required: true,
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

boardSchema.methods.isUserAllowed = function (idUser) {
    return (
        this.isPublic ||
        this.idMembers.find(member => member.equals(idUser) || member._id.equals(idUser)) ||
        this.idOwner.equals(idUser)
    );
};

// Duplicate the ID field.
boardSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
boardSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Board', boardSchema);