const express=require("express")
const videos=express.Router();
const {addVideoItems,getVideoItems}=require("../controllers/videoItem.controller")

videos.route("/").post(addVideoItems).get(getVideoItems)


module.exports=videos;