const express=require("express")
const app=express();
const {intializeDBConnection}=require("./dbConnection/dbConnection")
const dotenv=require("dotenv");
dotenv.config() //configuring dot env
const cors=require("cors");
const videos=require("./routes/videos");
const users=require("./routes/users");
const savedVideos=require("./routes/savedVideos");
const likedVideos=require("./routes/likedVideos")
const playlist=require("./routes/playList")
app.use(cors())

intializeDBConnection() //initializing DB
app.use(express.json()) //to parse JSON Data
app.use("/videos",videos)
app.use("/users",users)
app.use("/users",savedVideos)
app.use("/users",likedVideos)
app.use("/users",playlist)
app.get("/",(req,res)=>{
    res.send("Welcome To Express App")
    console.log("Welcome to express")
})

app.listen(process.env.port,()=>{
    console.log(`Successfully connected to port ${process.env.port}`)
})