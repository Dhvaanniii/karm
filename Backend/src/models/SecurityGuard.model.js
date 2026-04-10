const { Schema, model } = require("mongoose");

const securityschema= new Schema({
    profileimage:{
        type:String,
        required:true
    },
    full_name:{
        type:String,
        required:true
    },
    MailOrPhone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female','Others']
    },
    shift:{
        type:String,
        enum:['Day','Night']
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    adhar_card:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'security' 
    },
   password: {  
        type: String,
        required: true
    },
    otp: {
        type: String,
      },
      otpExpiration: {
        type: Date,
        default: Date.now,
        get: (otpExpiration) => otpExpiration.getTime(),
        set: (otpExpiration) => new Date(otpExpiration),
      },
},{timestamps:true})

const Guard=model("SecurityGuard",securityschema)
module.exports=Guard;