const { Schema, model } = require("mongoose");

const facilityschema= new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    remind:{
        type:String,
        required:true
    }
},{timestamps:true})
const Facility=model("Facility",facilityschema)
module.exports=Facility;