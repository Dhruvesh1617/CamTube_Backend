const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    savedVideos:
    {
        type:Schema.Types.ObjectId,
        ref:"SavedVideo"
    }
},
{
    timestamps:{
        createdAt:"createdAt"
    }
})
const User=mongoose.model("User",UserSchema)

module.exports={User}