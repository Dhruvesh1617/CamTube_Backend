const {VideoItem}=require("../models/videoData.model")


const getVideoItems=async (req,res)=>{
try{
     const videos=await VideoItem.find({}).select("-__v");
     res.status(201).json({message:"videoItems fetched Successfully",videos})
}
catch(err)
{
    console.log(err)
    res.status(500).json({message:"Not able to fetch videoItemd"})
}
}

const addVideoItems=async (req,res)=>{
    const videoItem=req.body;
    console.log(videoItem)
    try{
        const videos=new VideoItem({...videoItem});//adding videoItem
       
        await videos.save() //saving videoItem
        res.status(201).json({success:true,message:"videoItem posted Successfully",videos})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({success:false,message:"Not able to post videoItems"})
    }

}

module.exports={addVideoItems,getVideoItems}