const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.generateToeken = (userId,res)=>{
    const token= jwt.sign({
        userId,
        
    },
    process.env.JWT_SECRET,
    {expiresIn:"5d"})

    res.cookie("society-auth",token,{
        maxAge:5*24*60*60*1000, 
        httpOnly:true,
        // sameSite:"strict",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", 
        secure:process.env.NODE_ENV !== "development"
    })
    return token;
}
