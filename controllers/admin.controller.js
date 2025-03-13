const mongoose=require('mongoose');
const Event=require('../models/Event');
const Users=require('../models/Users');
const Trade=require('../models/Trade')
const Market=require('../models/Market')
const processPayouts=require('../utils/payout');


module.exports.create=async(req,res)=>{
    const{title,teamA,teamB,status}=req.body;
    try{
        const event = await Event.findOne({ title, teamA, teamB });
        if (event) {
            return res.status(400).json({ message: "Event already exists", success: false });
        }
        const newEvent = new Event({
            title,
            teamA,
            teamB,
            status, 
            isManual:true,
            preScore: "N/A",
        });
        const market=new Market({
            event:newEvent._id,
            odd:{
                1: 1.98, 2: 1.98, X: 1.98 
            }
        })
        await newEvent.save();
        await market.save();

        res.status(201).json({
            message: "Event created successfully!",
            event: newEvent,
            success: true,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}


module.exports.edit = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found", success: false });
        }

        if (updateData.status === "FINISHED") {
            console.log(`Event ${updatedEvent.title} has finished. Processing payouts...`);
            await processPayouts(updatedEvent._id, updatedEvent.preScore); 
        }

        res.status(200).json({
            message: "Event updated successfully!",
            event: updatedEvent,
            success: true,
        });

    } catch (error) {
        console.log("Error updating event:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


module.exports.getTrade=async(req,res)=>{
    try{
    const trade = await Trade.find().sort({ createdAt: -1 });
    res.status(200).json({Trade:trade,success:true})
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}