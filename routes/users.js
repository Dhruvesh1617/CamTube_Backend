const express=require("express")
const users=express.Router()
const {registerUser,loginUser,userDetails}=require("../controllers/users.controller")
const { checkAuthentication } = require("../middleware/checkAuthentication")
users.route("/register").post(registerUser)
users.route("/login").post(loginUser)
users.route("/").all(checkAuthentication).get(userDetails)

module.exports=users;