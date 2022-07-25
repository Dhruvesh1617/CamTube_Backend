const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const PlayListSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    playLists:[
        {
            playListName:{
                type:String,
                required:[true,"playlistName is required"]
            },
            videos:[
                {
                    type:Schema.Types.ObjectId,
                    ref:"VideoItem"
                }
            ]
        }
    ]
},{
    timestamps:{
        createdAt:"createdAt"
    }
})

const PlayList=mongoose.model("PlayList",PlayListSchema)

module.exports={PlayList}