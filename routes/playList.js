const express=require("express")
const playlist=express.Router()
const {checkAuthentication}=require("../middleware/checkAuthentication")
const {addPlayList,addVideoToPlayList, getAllPlayList}=require("../controllers/playList.controller")

playlist.route("/:userId/playlist").all(checkAuthentication).post(addPlayList).get(getAllPlayList)
playlist.route("/:userId/playlist/:playListId").all(checkAuthentication).post(addVideoToPlayList)


module.exports=playlist;