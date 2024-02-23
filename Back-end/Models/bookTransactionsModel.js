const mongoose = require("mongoose");

const bookTransactionSchema = new mongoose.Schema({
    bookISBN: {
        type: String,
        required: true
    },
    studentregisterno:{
        type:String,
        required:true
    },
    transactiondate:{
        type:String,
        required:true
    },
    returndate:{
        type:String,
        require:true
    },
    returneddate:{
        type:String
    },
    penalty:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model("BookTransaction", bookTransactionSchema);
