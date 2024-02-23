const mongoose=require("mongoose")

const studentSchema=new mongoose.Schema({
    
    registerno:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    yearofadmission:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        
    }

})

module.exports=mongoose.model("Student",studentSchema)