const mongoose=require('mongoose')
const Event =require('../models/Event');
const Users=require('../models/Users');
const Trade=require('../models/Trade');
const Market=require('../models/Market');


module.exports.bet=async(req,res)=>{
    try{
        const {id}=req.params;
        const { amount, betType } = req.body;
        const userId=req.user.id;
        console.log(id,amount, betType, userId)
        const event=await Event.findById(id);
        const user=await Users.findById(userId);
        console.log(user)
        if(!event || event.status=="FINISHED" ||event.status=="ADDED TIME" || event.status=="IN PLAY"){
           return  res.status(400).json({message:"Event is not present for bet",success:false})
        }
        if(!user){
          return  res.status(404).json({message:"User not found",success:false})
        }
        if(user.balance<amount){
           return  res.status(400).json({message:"User not have enough balance",success:false})
        }
        const market = await Market.findOne({ event: new mongoose.Types.ObjectId(id) });

        console.log(market)
        if (!market){ 
            return res.status(400).json({ message: "No market odds available", success: false })
        }

        let odds;
            if (betType === "teamA") odds = market.odd["1"] || 1.98;
            else if (betType === "draw") odds = market.odd["X"] || 1.98;
            else if (betType === "teamB") odds = market.odd["2"] || 1.98;
            else return res.status(400).json({ message: "Invalid bet type", success: false });

        if (!odds){
            return res.status(400).json({ message: "Odds not available", success: false });
        }
        const payout = amount * odds; 

        const trade = new Trade({
            userId,
            event: id,
            amount,
            status: "pending",
            betType,
            payout
        });

        await trade.save();
        user.balance=user.balance-amount;
        await user.save();

        res.status(201).json({message: "Bet placed successfully!", trade});

    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}

