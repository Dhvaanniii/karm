const { Schema, model } = require("mongoose");

const visitorschema= new Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    wing:{
        type:String,
        required:true
    },
    unit:{
        type:Number,
        required:true
    },
    purpose:{
        type:String,
        default:""
    },
    photoUrl:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
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

const Visitor= model("Visitor",visitorschema)
module.exports=Visitor;