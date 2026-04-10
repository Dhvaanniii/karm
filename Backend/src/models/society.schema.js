const { Schema, model } = require("mongoose");

const Societyschema= new Schema({
    Society_name :{
       type:String,
       required:true
    },
    Society_address:{
        type:String,
        required:true
    },
    Country:{
    type:String,
    required:true
    },
    State:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    ZipCode:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Society=model("Society",Societyschema)
module.exports=Society;