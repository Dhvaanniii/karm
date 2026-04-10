const { Schema, model, default: mongoose } = require("mongoose");

const announcement =new Schema({

   type:{
        type:String,
        enum:["Event","Activity"]
   },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        reqired:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    members:[{
        participent: {
          type: mongoose.SchemaTypes.ObjectId,
          refPath: 'members.residentType', 
          
        },
        residentType: {
          type: String,
          enum: ["Owner", "Tenante"], 
        },
    }],
    time: {
    type: String,
    default: function() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; 
      return `${formattedHours}:${minutes} ${ampm}`;
    }
  }
},{timestamps:true})
const Announcement = model("Announcement",announcement)
module.exports=Announcement;