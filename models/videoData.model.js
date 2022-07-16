const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const VideoSchema=new Schema({
    name:{type:String,required:true},
    imgUrl:{type:String,required:true},
    videoUrl:{type:String,required:true},
    duration:{type:String,required:true},
    details:{type:String,required:true},
})

const VideoItem=mongoose.model("VideoItem",VideoSchema)

module.exports={VideoItem}