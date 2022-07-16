const mongoose=require("mongoose")

const intializeDBConnection=async (req,res)=>{

    try{
      await mongoose.connect(process.env.uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
      })
      console.log("Successfully connected to DB")
    }
catch(err)
{
    console.log(err)
}
}

module.exports={intializeDBConnection}