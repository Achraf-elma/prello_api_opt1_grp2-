const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    displayName: String,
    desc: String,
    idBoards: [String],
    memberships: [Object],
    memberType: String,
    prefs: Object,
    irAdmins: [String],
});

module.exports = mongoose.model('Team', teamSchema)