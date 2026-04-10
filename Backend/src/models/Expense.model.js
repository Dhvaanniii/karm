const { Schema, model } = require("mongoose");

const expensemodel= new Schema({
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
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    bill:{
        type:String,
        required:true
    }
},{timestamps:true})
const Expense= model("Expense",expensemodel)
module.exports=Expense;