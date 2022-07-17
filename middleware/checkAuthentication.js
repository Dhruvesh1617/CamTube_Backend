const jwt=require("jsonwebtoken")
const checkAuthentication=async (req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1] || null;
    console.log("token is ",token);
try{
    if(token===null)
    {
        return res.status(404).json({message:"please signin/Login for better Experience"})
    }
    const decoded=jwt.verify(token,process.env.secretKey) //will verify token signature using secret key
    console.log("Data received",decoded)
    req.user=decoded;
    next()

}
catch(err)
{
    console.log(err)
    return res.status(401).json({message:"Authentication failed",err})
}
}

module.exports={checkAuthentication}