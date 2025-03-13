const axios = require("axios");
const Event = require("../models/Event");
const { getIoInstance } = require("../utils/websocket");



module.exports.activeEvent=async(req,res)=>{
    try{
     const event =await Event.find({status:"NOT STARTED"})
     res.status(200).json({Event:event,success:true})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}
