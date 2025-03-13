const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({
    fixtureId: { 
        type: Number,
        unique: true },
    title:{
        type:String,
        required:true
    },
    teamA:{
        type:String,
        required:true
    },
    teamB:{
        type:String,
        required:true
    },
    liveScore:{
        type:String,
        default: "0 - 0"
    },
    preScore: { 
        type: String,
        default: "0 - 0"
    }, 
    status: { 
        type: String,
        required: true
    },
    time:{ 
        type: String,
        default:"0"
    },
    isManual: { 
        type: Boolean,
        default: false
    }
},{ timestamps: true })

const Event=mongoose.model('Event',eventSchema);

module.exports=Event;