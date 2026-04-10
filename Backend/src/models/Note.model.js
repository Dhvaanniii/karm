const { Schema, model } = require("mongoose");

const noteschema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    }
},{timestamps:true})
const Note=model("Note",noteschema)
module.exports=Note;