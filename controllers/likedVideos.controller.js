const { LikedVideo } = require("../models/likedVideos.model");
const { User } = require("../models/users.model");


const getLikedVideos=async(req,res)=>{
    const {userId}=req.params;
    console.log({userId})
    try{
        const likedVideos=await LikedVideo.findOne({userId}).populate("videoItems")
        await likedVideos.save()
        res.status(201).json({message:"likedvideos fetched successfully",likedVideos})
    }
    catch(err)
    {
        console.log(err)
        res.status(401).json({message:"likedvideos fetching unsuccessful",err})
    }
}


const addLikedVideos=async (req,res)=>{
    const {userId,videoItem}=req.body;
    const foundUserLikedVideos=await LikedVideo.findOne({userId})
    const foundUser=await User.findById(userId)
    try{
        if(foundUserLikedVideos)
        {
        foundUserLikedVideos.videoItems.push(videoItem)
        const likedvideos=await(await foundUserLikedVideos.save()).populate("videoItems")
        console.log("likedVideos",likedvideos)
        return res.status(201).json({message:"video liked successfully",likedvideos})
        }
        const likedVideo=new LikedVideo({userId,videoItems:[videoItem]})
        foundUser.likedVideos=likedVideo
        await foundUser.save()
        const videoLiked=await (await likedVideo.save()).populate("videoItems")
        console.log("likedVideos",videoLiked)
        res.status(201).json({message:"video liked successfully",videoLiked})
    }
catch(err)
{
    console.log(err)
    res.status(401).json({success:false,message:"Video like unsucessful"})
}
}

const removeLikedVideos=async(req,res)=>{
    const{userId,videoId}=req.body;
    console.log("req body data",{userId,videoId})
    const foundUserLikedVideos=await LikedVideo.findOne({userId})
    try{
        if(foundUserLikedVideos)
        {
            foundUserLikedVideos.videoItems=foundUserLikedVideos.videoItems.filter(video=>String(video)!==String(videoId))
            console.log("after removal",foundUserLikedVideos)
            const updatedLikedVideos=await (await foundUserLikedVideos.save()).populate("videoItems")
            console.log("changes",updatedLikedVideos)
            res.status(201).json({message:"video removed successfully",updatedLikedVideos})
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(401).json({message:"video removal unsuccessful",err})
    }
}

module.exports={addLikedVideos,getLikedVideos,removeLikedVideos}