const mongoose = require('mongoose');

const LabelSchema = mongoose.Schema({
    id: {
        type:String,
        required:true
    },
    name: {
        type: String, 
        required: true
    },
    idCard: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Card'
    },
    idBoards: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Board'
    },
    color: String
},
{
    timestamps: true
});

module.exports = mongoose.model('Label', LabelSchema);