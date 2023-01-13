const mongoose = require("mongoose");
//======================================================================
const userSchemas = new mongoose.Schema({
  
    name : {
        type:String,
        required:true,
        trim:true
    },

    dob : {
        type:String,
        required: true,
        trim: true
    },

    emailId : {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },

    password : {
        type:String,
        required:true,
        trim:true,
        unique:true
    }

},{timestamps:true});

//======================================================================
module.exports = mongoose.model('user',userSchemas);