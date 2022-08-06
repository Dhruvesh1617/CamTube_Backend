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

const removeHistoryVideo=async(req,res)=>
{
    const {userId}=req.params;
    const {videoId}=req.body;
    const foundUserHistory=await History.findOne({userId})
    try
    {
        if(foundUserHistory)
        {
            foundUserHistory.videoItems=foundUserHistory.videoItems.filter((video)=>String(video)!==String(videoId))
            const updatedHistory=await (await foundUserHistory.save()).populate("videoItems")
            res.status(201).json({success:true,message:"history Item removed successfully",history:updatedHistory})
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(404).json({message:"Not able to remove video to History",err})

    }

}

const clearHistory=async (req,res)=>
{
    const {userId}=req.params;
    const foundUserHistory=await History.findOne({userId})
    try{
        if(foundUserHistory)
        {
            foundUserHistory.videoItems=[];
            const newHistory=await (await foundUserHistory.save()).populate("videoItems")
            res.status(201).json({success:true,message:"history Items cleared successfully",history:newHistory})

        }
        
    }
    catch(err)
    {
        console.log(err)
        console.log(err)
        res.status(404).json({message:"Not able to clear History",err})
    }


}

module.exports={addToHistory,getHistory,removeHistoryVideo,clearHistory}