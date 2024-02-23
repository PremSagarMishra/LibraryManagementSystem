const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }).then(function(){
    console.log("Connection established properly with db")
  }).catch(function(err){
    console.log("couldn't connect with db"+err)
  })