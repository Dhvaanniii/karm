const { Schema, model, default: mongoose } = require("mongoose");

const incomeschema= new Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    members:[{
        resident: {
          type: mongoose.SchemaTypes.ObjectId,
          refPath: 'members.residentType', 
          required: true,
        },
        residentType: {
          type: String,
          
          enum: ["Owner", "Tenante"], 
        },
        paymentStatus: {
          type: String,
          enum: ["pending", "done"],
          default: "pending",
        },
        paymentMode: {
          type: String,
          enum: ["online", "cash","none"],
          default: "none",
        },
       
    }],
    member:{
        type:Number,
        default:0
       }

},{timestamps:true})
const Income=model("Income",incomeschema)
module.exports=Income;