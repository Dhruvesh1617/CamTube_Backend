const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const LikedVideosSchema=new Schema({
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
    }}
)
const LikedVideo=mongoose.model("LikedVideo",LikedVideosSchema)

module.exports={LikedVideo}