const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const SavedVideosSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    videoItems:[
        {
            type:Schema.Types.ObjectId,
            ref:"VideoItem"
        }]
},{
    timestamps:{
        createdAt:"createdAt"
    }
})
const SavedVideo=mongoose.model("SavedVideo",SavedVideosSchema)
module.exports={SavedVideo}