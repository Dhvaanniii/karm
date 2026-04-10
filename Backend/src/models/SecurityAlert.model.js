const { Schema, model } = require("mongoose");

const alertschema= new Schema({
    alert_type:{
        type:String,
        enum:['Emergency','Warning','Fire Alarm', 'Earth Quack' , 'High Winds' , 'Thunder']
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})
const Alert= model("Alert",alertschema)
module.exports=Alert;