const mongoose=require('mongoose');
const Event=require('../models/Event');
const Users=require('../models/Users');

module.exports.profile=async(req,res)=>{
    try{
    const user=await Users.findById(req.user.id);
    res.status(200).json({User:user,success:true});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}