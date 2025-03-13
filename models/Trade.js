const mongoose = require('mongoose');

const tradeSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        required:true
    },
    betType:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending", "won", "lost"],
        default:'pending'
    },
    payout:{
        type:Number
    }
},{timestamps:true});

const Trade=new mongoose.model('Trade',tradeSchema);

module.exports=Trade;