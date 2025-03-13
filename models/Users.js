const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true   
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    balance:{
        type:Number,
        default:0
    }

})

const Users=mongoose.model('Users',userSchema);
module.exports=Users;