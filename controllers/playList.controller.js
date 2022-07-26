const { PlayList } = require("../models/playList.model");
const { User } = require("../models/users.model");



const getAllPlayList=async (req,res)=>{
    const {userId}=req.params;
    try{
        const playlist=await PlayList.findOne({userId}).select("-__v -createdAt").populate("playLists.videos")
        res.status(201).json({playlist})
    }
    catch(err)
    {
        console.log(err)
    }

}


const addPlayList=async(req,res)=>{
    const {userId}=req.params;
    const {playListName}=req.body;
    const foundPlaylist=await PlayList.findOne({userId})
    const foundUserData=await User.findById(userId)
    let existAlready=false;
    try{
        if(!foundPlaylist) // if playlist is not founded based on given Id /will execute if no playlist is created before
        {
            const newPlayList=new PlayList({userId,playLists:[{playListName,videos:[]}]}); //adding playlistName in model
            foundUserData.PlayList=newPlayList; //adding data to user model
            await foundUserData.save(); //saving it
            const updatedNewPlayList=await(await newPlayList.save()).populate("playLists.videos");
            console.log("users new playlist update",updatedNewPlayList)
            res.status(201).json({message:"PlayList Created Successfully",playlist:updatedNewPlayList})
        }
        else if(foundPlaylist?.playLists?.length>0) //it will execute if user has already created playlist 
        {
            foundPlaylist.playLists.map((item)=>{
                if(item.playListName===playListName) //will check if playlist model playlistname matches or not
                {
                    existAlready=true;
                    return res.status(401).json({message:"playlist already exist"})
                }
            })
        }
        if(!existAlready) //it will execute if playlist already exist for user and we are adding new playlist
        {
            foundPlaylist.playLists.push({playListName,videos:[]})
            const updateNewPlayList=await(await foundPlaylist.save()).populate("playLists.videos")
            console.log("existing user playlist update",updateNewPlayList)
            return res.status(201).json({message:"PlayList Created Successfully",playlist:updateNewPlayList})
        }

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Not able to add playlist",err})
    }

}

const removePlayList=async (req,res)=>{
    const {userId}=req.params;
    const {playlistId}=req.body;
    const foundPlaylist=await PlayList.findOne({userId})
    console.log("playlist of specific user",foundPlaylist)
    try{
       foundPlaylist.playLists=foundPlaylist.playLists.filter((item)=>String(item._id)!==String(playlistId))
       console.log("playlist after filter",foundPlaylist)
        const updatedPlaylist=await (await foundPlaylist.save()).populate("playLists.videos")
        res.status(201).json({message:"Playlist removed successfully",playlist:updatedPlaylist})
     }

    catch(err)
    {
        console.log(err)
        res.status(404).json({message:"playlist not removed something went wrong",err})
    }
}


const addVideoToPlayList=async(req,res)=>{
    const {userId,playListId}=req.params;
    const {playListName,videoId}=req.body;
    const foundPlaylist=await PlayList.findOne({userId});
    const foundUserData=await User.findById(userId);
    try{
        if(foundPlaylist)
        {
            foundPlaylist.playLists.map((item)=>String(item._id)===String(playListId)?item.videos.push(videoId):item) //pushing video in playlist model
            foundUserData.playListVideos=foundPlaylist; //adding data in playlistVideos of user model
            await foundUserData.save();
            const updatedPlaylist=await(await foundPlaylist.save()).populate("playLists.videos") //populating data
          return  res.status(201).json({message:"video added in playlist successfully",playlist:updatedPlaylist})
        }
        const addToPlayList=new PlayList({userId,playLists:[{playListName,videos:[videoId]}]})
        foundUserData.playListVideos=addToPlayList;
        await foundUserData.save();
        const newUpdatedPlayList=await(await addToPlayList.save()).populate("playLists.videos")
        res.status(201).json({message:"video added successfully",playlist:newUpdatedPlayList})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Not able to add playlist  videos",err})
    }
}

const removeVideoFromPlayList=async (req,res)=>{
    const {userId}=req.params;
    const {playListId,videoId}=req.body;
    
    const foundPlaylist=await PlayList.findOne({userId})
    try{
    foundPlaylist.playLists.map((playlist)=>{
        if(String(playlist._id)===playListId)
        {
            return (playlist.videos=playlist.videos.filter(video=>String(video)!==videoId))
        }
    })
    const updatedPlaylist=await (await foundPlaylist.save()).populate("playLists.videos")
    res.status(201).json({message:"video from playlist removed successfully",playlist:updatedPlaylist})

    }
    catch(err)
    {

        res.status(500).json({message:"Not able to remove playlist  videos",err})
    }
}

module.exports={addPlayList,addVideoToPlayList,getAllPlayList,removePlayList,removeVideoFromPlayList}