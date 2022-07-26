const {History}=require("../models/history.model");
const { User } = require("../models/users.model");



const getHistory=async (req,res)=>{
    const {userId}=req.params;
    try{
        const history=await History.findOne({userId}).populate("videoItems");
        await history.save()
        res.status(201).json({message:"history videos fetched successfully",history})
    }
    catch(err)
    {
        console.log(err)
        res.status(404).json({message:"history videos fetchinh unsuccessful",err})
    }
}

const addToHistory=async (req,res)=>{
    const {userId}=req.params;
    const {videoItem}=req.body;
    const foundHistory=await History.findOne({userId})
    const foundUserData=await User.findById(userId)
    try{
        if(foundHistory)
        {
            foundHistory.videoItems.push(videoItem);
            const updatedHistory=await(await foundHistory.save()).populate("videoItems");
            return res.status(201).json({message:"Video added into history successfully",history:updatedHistory})
        }
        const newUserHistory=new History({userId,videoItems:[videoItem]})
        foundUserData.historyVideos=newUserHistory;
        await foundUserData.save()
        const updatedNewUserHistory=await(await newUserHistory.save()).populate("videoItems");
        res.status(201).json({message:"Video added into history successfully",history:updatedNewUserHistory})

    }
    catch(err)
    {
        console.log(err)
        res.status(404).json({message:"Not able to add video to History",err})
    }

}

module.exports={addToHistory,getHistory}