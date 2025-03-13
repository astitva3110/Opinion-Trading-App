const mongoose = require('mongoose'); 
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();




//register controller
module.exports.register=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const user=await User.findOne({
            email
        });
        if(user){
            return res.status(400).json({message:"User already exists",success:false});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            name,
            email,
            password:hashedPassword,
            role
        });
        await newUser.save();
        res.status(201).json({message:"User registered successfully",success:true});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}



//login controller
module.exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found",success:false});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials",success:false});
        }
        const payload={
            user:{
                id:user.id,
                role:user.role
            }
        };
        const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
        res.status(200).json({message:"Login Successfully", token:token ,success:true});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}