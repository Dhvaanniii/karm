const { Schema, model } = require("mongoose");


const numberSchema=new Schema({
    Full_name:{
        type:String,
        required:true
    },
    Phone_Number:{
        type:String,
        required:true
    },
    Work:{
        type:String,
        required:true
    }
})
const ImportantNumber=model("ImportantNumber",numberSchema)
module.exports=ImportantNumber;