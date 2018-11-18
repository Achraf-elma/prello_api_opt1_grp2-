const mongoose = require('mongoose');

const LabelSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    idCard: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Card'
    },
    idBoard: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Board'
    },
    color: String
},
{
    timestamps: true
});

module.exports = mongoose.model('Label', LabelSchema);