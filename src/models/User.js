const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = mongoose.Schema({
    fullName: String,
    email: { type: String, required: true},
    bio: String,
    initials: String,
    memberType: String, // ?
    loginType: String, // Google or normal  
    hashpass: String, // Password hash
    saltpass: String, // Password hash salt
    preferences: {
        type: Object,
        default: {
            scheduleHour: 12,
        }
    },
},
{
    timestamps: true
},
{
    _id: false
});

/** PASSWORD **/
const SALT_LENGTH = 32;
const HASH_ROUND = 100;
const HASH_LENGTH = 128;
UserSchema.methods.setPassword = function (password) {
    this.saltpass = crypto.randomBytes(SALT_LENGTH).toString('hex');
    this.hashpass = crypto.pbkdf2Sync(password, this.saltpass, HASH_ROUND, HASH_LENGTH, `sha512`).toString(`hex`);
    return this;
};

UserSchema.methods.checkPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.saltpass, HASH_ROUND, HASH_LENGTH, `sha512`).toString(`hex`);
    return this.hashpass === hash;
};

module.exports = mongoose.model('User', UserSchema)
