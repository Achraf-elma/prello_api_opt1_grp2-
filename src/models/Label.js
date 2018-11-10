const mongoose = require('mongoose');

const LabelSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
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