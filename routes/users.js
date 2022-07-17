const express=require("express")
const users=express.Router()
const {registerUser,loginUser}=require("../controllers/users.controller")
users.route("/register").post(registerUser)
users.route("/login").post(loginUser)

module.exports=users;