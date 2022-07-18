const express=require("express");
const savedvideos=express.Router()
const {addSavedVideos,getSavedVideos}=require("../controllers/savedVideos.controller");
const { checkAuthentication } = require("../middleware/checkAuthentication");
savedvideos.route("/:userId/savedVideos").all(checkAuthentication).post(addSavedVideos).get(getSavedVideos)


module.exports=savedvideos;