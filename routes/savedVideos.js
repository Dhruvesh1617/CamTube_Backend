const express=require("express");
const savedvideos=express.Router()
const {addSavedVideos,getSavedVideos,removeSavedVideos}=require("../controllers/savedVideos.controller");
const { checkAuthentication } = require("../middleware/checkAuthentication");
savedvideos.route("/:userId/savedVideos").all(checkAuthentication).post(addSavedVideos).get(getSavedVideos)
savedvideos.route("/:userId/savedVideos/remove").all(checkAuthentication).post(removeSavedVideos)


module.exports=savedvideos;