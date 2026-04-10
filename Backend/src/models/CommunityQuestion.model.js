const { Schema, model } = require("mongoose");

const questionschema = new Schema({
    question: {
        type: String,
        required: true
    },
    ans: [{
        answer: {
            type: String,
            
        },
    }],
    downVote:{
        type:Number,
        default:0
    },
    upVote:{
        type:Number,
        default:0
    },
    createdBy: {
        type: String
    },


}, { timestamps: true })
const Question = model("question", questionschema)
module.exports = Question