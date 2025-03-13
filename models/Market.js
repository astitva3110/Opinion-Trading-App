const mongoose =require('mongoose');

const marketSchema=new mongoose.Schema({
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        required:true
    },
    odd:{
        type:Object,
        required:true
    },
    lastUpdated: { type: Date, default: Date.now }
},{timestamps:true});

const Market=new mongoose.model('Market',marketSchema);

module.exports=Market;