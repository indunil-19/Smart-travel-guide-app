const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const travelSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    review:{
        type:String
    },
    travelPlan:{
        type:Array,
        required:true,
        default:[[[]],[]]
    },
    ownedBy:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    rate:{
        type:Number
    },
    public:{
        type:Boolean,
        default:false
    }


}, {timestamps:true})

mongoose.model("TravelPlan",travelSchema)