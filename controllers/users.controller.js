const emailValidator=require("email-validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {User}=require("../models/users.model")

const registerUser=async(req,res)=>{
    const {username,email,password}=req.body;
    const emailValidation=emailValidator.validate(email);
    const foundUser=await User.findOne({email});
    console.log(`username:${!username},password:${!password},email:${!email}`)
    console.log(`emailValidation:${emailValidation}`)
    if(!username || !email || !password)
    {
        return res.status(404).json({success:false,message:"please enter all fields"})
    }
    if(!emailValidation)
    {
        return res.status(404).json({success:false,message:"please enter appropriate email"})
    }
    try{
        if(foundUser)
        {
            return res.status(404).json({success:false,message:"Already registered please login/signIn"})
        }
    const user=new User({username:username,email:email,password:password})
    bcrypt.genSalt(10,(err,salt)=>{  //will generate salt
    
        bcrypt.hash(user.password,salt,async(err,hash)=>{ //will generate hash and will be stored as user password
            if(err)
            {
                throw new Error(err)
            }
            user.password=hash; //passed hash as password
            await user.save() //stored user data
            console.log(user)
        jwt.sign({_id:user._id},process.env.secretKey,{expiresIn:"6h"},(err,token)=>{
            if(err)
            {
                throw new Error(err)
            }
            user.password=undefined;
            user.__v=undefined;
            console.log("token is",token)
            res.status(201).json({message:"User registered Successfully",token,user})
        })
        })

    })
    
 }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Not able to register user",cause:{err}})
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const emailValidation=emailValidator.validate(email);
    if(!email || !password)
    {
        return res.status(404).json({success:false,message:"please enter all fields"})
    }
    if(!emailValidation)
    {
        return res.status(404).json({success:false,message:"please enter appropriate email"})
    }
    try{
    const foundUser=await User.findOne({email})
    console.log("user",foundUser)
    if(!foundUser)
    {
        return res.status(404).json({success:false,message:"please register,User not found"})
    }
    const passwordCheck=await bcrypt.compare(password,foundUser.password) //will compare hash and user entered password matches or not
    console.log(passwordCheck)
    if(!passwordCheck)
    {
        return res.status(404).json({success:false,message:"Please enter Valid Credentials"})
    }
    jwt.sign({_id:foundUser._id},process.env.secretKey,{expiresIn:"6h"},(err,token)=>{
        if(err)
        {
            throw new Error(err)
        }
        foundUser.password=undefined;
        foundUser.__v=undefined;
    res.status(201).json({message:"User logged in successfully",token,user:foundUser})
    })

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Not able to login user",cause:{err}})
    }

}

const userDetails=async(req,res)=>{
    const userId=req.user._id;
    console.log("user",req.user)
    console.log("userId",userId)
    try{
        const user=await User.findById(userId);
        console.log("User",user)
       return res.status(201).json({message:"User data fetched successfully",user})

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({success:false,message:"Something went wrong"})
    }

}

module.exports={registerUser,loginUser,userDetails}