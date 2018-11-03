const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    bio: String,
    initials: String,
    memberType: String,
    loginType: String,
    idBoards: [String],
    notifications: [String],
},
{
    timestamps: true
});
module.exports = mongoose.model('User', userSchema)