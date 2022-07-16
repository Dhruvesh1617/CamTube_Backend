const express=require("express")
const app=express();

const {intializeDBConnection}=require("./dbConnection/dbConnection")
const dotenv=require("dotenv")
dotenv.config() //configuring dot env
const cors=require("cors")
const videos=require("./routes/videos")
app.use(cors())

intializeDBConnection() //initializing DB
app.use(express.json()) //to parse JSON Data
app.use("/videos",videos)
app.get("/",(req,res)=>{
    res.send("Welcome To Express App")
    console.log("Welcome to express")
})

app.listen(process.env.port,()=>{
    console.log(`Successfully connected to port ${process.env.port}`)
})