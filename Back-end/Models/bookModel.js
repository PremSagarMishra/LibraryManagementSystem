const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail:{
        type:String,
        required:true
    },
    author: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Book", bookSchema);
