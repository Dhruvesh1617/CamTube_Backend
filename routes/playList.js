const express=require("express")
const playlist=express.Router()
const {checkAuthentication}=require("../middleware/checkAuthentication")
const {addPlayList,addVideoToPlayList, getAllPlayList, removePlayList,removeVideoFromPlayList}=require("../controllers/playList.controller")

playlist.route("/:userId/playlist").all(checkAuthentication).post(addPlayList).get(getAllPlayList)
playlist.route("/:userId/playlist/:playListId").all(checkAuthentication).post(addVideoToPlayList)
playlist.route("/:userId/playlist/:playListId/remove").all(checkAuthentication).post(removePlayList)
playlist.route("/:userId/playlist/:playListId/:videoId/remove").all(checkAuthentication).post(removeVideoFromPlayList)



module.exports=playlist;