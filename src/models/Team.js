var mongoose = require('mongoose');

var TeamSchema = mongoose.Schema({
    displayName: String,
    desc: String,
    idBoards: [String],
    memberships: [Object],
    memberType: String,
    prefs: Object,
    irAdmins: [String],
});

module.exports = mongoose.model('Team', TeamSchema)