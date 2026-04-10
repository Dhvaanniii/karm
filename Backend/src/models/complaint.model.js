const { Schema, model, default: mongoose } = require("mongoose");

const compliantschema= new Schema({
    complainer:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    wing:{
        type:String,
        required:true
    },
    unit:{
        type:Number,
        required:true,
    },
    priority:{
        type:String,
        default:"Medium",
        enum:['High', 'Medium', 'Low'] 
    },
    status:{
        type:String,
        default:"Open",
        enum:['Open', 'Pending', 'Solve'] 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'createdByType', 
        require:true
    },
    createdByType: {
        type: String, 
        enum: ['Owner', 'Tenante',"User"] 
    }
},{timestamps:true})
const Complaint= model("Complaint",compliantschema)
module.exports=Complaint;