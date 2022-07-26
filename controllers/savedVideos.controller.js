const { SavedVideo } = require("../models/savedVideos.model");
const { User } = require("../models/users.model");



const getSavedVideos=async (req,res)=>{
    const {userId}=req.params;
    //console.log(userId)
    console.log({userId})
    console.log("req params",req.params)
    try{
        const savedVideos=await SavedVideo.findOne({userId}).populate("videoItems")
        await savedVideos.save()
        res.status(201).json({message:"SavedVideos fetched successfully",savedVideos})
    }
    catch(err)
    {
        console.log(err)
        res.status(404).json({message:"Not able to fetch saved Videos"})
    }
}
const addSavedVideos=async (req,res)=>{
    const {userId}=req.params;
    const {videoItem}=req.body;
    console.log("request body/req params",{userId,videoItem})
    const foundSavedUser=await SavedVideo.findOne({userId}) //findingOut if userid is present savedVideo Model
    const foundUser=await User.findById(userId) //findingOut if given UserId present in User model or not
    try{
        if(foundSavedUser) //checked if given user already saved any video or not
        {
        foundSavedUser.videoItems.push(videoItem) //pushed videoItem in givenUsers SavedVideo list
        const updatedSavedVideos=await (await foundSavedUser.save()).populate("videoItems")//populated data
        console.log(updatedSavedVideos)
        return res.status(201).json({success:true,message:"video Saved successfully",updatedSavedVideos})
        }
    const savedVideo=new SavedVideo({userId,videoItems:[videoItem]}); //will run when user is saving video for first time
    foundUser.savedVideos=savedVideo; //pushing data in users model savedVideos 
    await foundUser.save(); //saving it
    const updatedSavedVideo=await (await savedVideo.save()).populate("videoItems")
    console.log(updatedSavedVideo)
    res.status(201).json({success:true,message:"video Saved successfully",updatedSavedVideo})

    }
    catch(err)
    {
        console.log(err)
        res.status(404).json({success:false,message:"Not able to save video",err})

    }
}

const removeSavedVideos=async(req,res)=>{
    const {userId}=req.params;
    const {videoId}=req.body;
    const foundUserSavedVideos=await SavedVideo.findOne({userId})
    try{
        if(foundUserSavedVideos)
        {
            foundUserSavedVideos.videoItems=foundUserSavedVideos.videoItems.filter(video=>String(video)!==String(videoId))
            const updatedSavedVideos=await (await foundUserSavedVideos.save()).populate("videoItems")
            res.status(201).json({message:"Video removed successfully",updatedSavedVideos})
        }

    }
    catch(err)
    {
        console.log(err)
        res.status(401).json({message:"Video removed unsuccessful",err})
    }
}

module.exports={addSavedVideos,getSavedVideos,removeSavedVideos}