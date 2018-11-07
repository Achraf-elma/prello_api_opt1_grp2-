const mongoose = require('mongoose');

const mailSettingSchema = mongoose.Schema({
    //the datetime the notification was triggered
    time: Date,
    idBoardsSubscribed: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Board'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('MailSetting', mailSettingSchema)