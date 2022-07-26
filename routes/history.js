const express=require("express")
const history=express.Router();
const {addToHistory, getHistory}=require("../controllers/history.controller")
const {checkAuthentication}=require("../middleware/checkAuthentication")
history.route("/:userId/history").all(checkAuthentication).post(addToHistory).get(getHistory)


module.exports=history;