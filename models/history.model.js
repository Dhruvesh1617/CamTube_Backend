const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const HistorySchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    videoItems:[
        {
            type:Schema.Types.ObjectId,
            ref:"VideoItem"
        }
    ]
},{
    timestamps:{
        createdAt:"createdAt"
    }
})

const History=mongoose.model("History",HistorySchema)

module.exports={History}