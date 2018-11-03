const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    //the datetime the notification was triggered
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    action: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Action',
        required: true
    }],
    isRead: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema)