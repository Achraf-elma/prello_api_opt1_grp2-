var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    fullName: String,
    email: String,
    bio: String,
    initials: String,
    memberType: String,
    loginType: String,
    idBoards: [String],
    notifications: [String],
});

module.exports = mongoose.model('User', UserSchema)