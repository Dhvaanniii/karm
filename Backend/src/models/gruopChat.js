const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.SchemaTypes.ObjectId,
      refPath: "senderModel",
      require: true,
    },
    senderProfile: {
      type: String,
      require: true,
    },
    senderName: {
      type: String,
      require: true,
    },
    senderModel: {
      type: String,
      require: true,
    },
    message: {
      type: String,
    },
    
  },
  { timestamps: true }
);

const groupChatModel = mongoose.model("GroupChat", groupChatSchema);

module.exports = groupChatModel;
