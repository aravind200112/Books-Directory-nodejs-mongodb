const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    

    author: {
        type: String,
        required: true
    },
    
    regno: {
        type: Number,
        required: true
    },
   

    price: {
        type: Number,
        required: true
    },

    available_status: {
        type: Boolean,
        required: true,
        default: true
    }


});

module.exports = mongoose.model('Book', bookSchema);
   