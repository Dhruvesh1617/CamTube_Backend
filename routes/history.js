const express=require("express")
const history=express.Router();
const {addToHistory, getHistory, removeHistoryVideo, clearHistory}=require("../controllers/history.controller")
const {checkAuthentication}=require("../middleware/checkAuthentication")
history.route("/:userId/history").all(checkAuthentication).post(addToHistory).get(getHistory)
history.route("/:userId/history/remove").all(checkAuthentication).post(removeHistoryVideo)
history.route("/:userId/history/clear").all(checkAuthentication).post(clearHistory)


module.exports=history;