const asyncHandler = require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

//register a user
//route Get /api/users/register
//public

const registerUser = asyncHandler( async (req, res)=>{
    const {username , email , password} = req.body;
    console.log(req.body);
    if(!username || !email|| !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable=await User.findOne({email : email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exist");
    }

    const hashPassword=await bcrypt.hash(password , 10);
    console.log("Hash Password :", hashPassword);
    const user=await User.create({
        username,
        email,
        password:hashPassword,
    })
    console.log("user created :" , user);
    if(user){
        res.status(201).json(user);

    }
    else{
        res.status(400);
        throw new Error("User data is not Valid");
    }
})


//login a user
//route Post /api/users/login
//public

const loginUser =asyncHandler( async (req, res)=>{
    const{email , password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user=await User.findOne({email : email});

    //compare password with hashed password

    if(user && (await bcrypt.compare(password , user.password))){
        const accessToken= jwt.sign({
            user:{
                username:user.username,
                email:user.email,      //payload
                id:user.id,
            }
        } , 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"15m",
        }
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("Email or Password is not valid");
    }

})

//CURRENT user info
//route Get /api/users/current
//Private
const currentUser =asyncHandler( async (req, res)=>{
    console.log("entered");
    res.json({message:"register the user"});
})

module.exports={registerUser , loginUser , currentUser};


