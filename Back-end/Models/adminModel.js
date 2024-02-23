const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    doj:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Admin", adminSchema);
