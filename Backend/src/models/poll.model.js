const { Schema, model, default: mongoose } = require("mongoose");

const pollSchema = new Schema(
  {
    pollType: {
      type: String,
      enum: [
        "Multichoice polls",
        "Numeric Polls",
        "Ranking polls",
        "Rating Polls",
        "Text poll",
      ],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
   options: [
            {
                text: String,
                votes: {
                    type: Number,
                    default: 0,
                },
                voters: [
                    {
                        type: Schema.Types.ObjectId,
                        refPath: 'createdByType', 
                    },
                ],
            },
        ],
    createdBy: {
      type: Schema.Types.ObjectId,
      refPath: "createdByType",
    },
    createdByType: {
        type: String,
        enum: ['Owner', 'Tenante'],
    },
    
   
},{timestamps:true});


const Poll = model("Poll", pollSchema);
module.exports = Poll;
