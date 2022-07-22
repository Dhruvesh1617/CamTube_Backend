const express=require("express")
const { checkAuthentication } = require("../middleware/checkAuthentication")
const {addLikedVideos,getLikedVideos,removeLikedVideos}=require("../controllers/likedVideos.controller")
const likedvideos=express.Router()
likedvideos.route("/:userId/likedVideos").all(checkAuthentication).post(addLikedVideos).get(getLikedVideos)
likedvideos.route("/:userId/likedVideos/remove").all(checkAuthentication).post(removeLikedVideos)

module.exports=likedvideos;