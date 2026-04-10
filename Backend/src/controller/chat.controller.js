const Chat = require("../models/chat.schema");
const groupChatModel = require("../models/gruopChat");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

// send Message
exports.sendMessage = async (req, res) => {
  try {
    const { userId, receiverId, message, senderModel, receiverModel } =
      req.body;

    if (!req.file && !message) {
      return res.status(400).json({ message: "Don't send empty message!" });
    }

    let imageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "media",
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = result.secure_url;

      // delete image from local after upload
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log("error a deleting file", err);
        } else {
          console.log("file  deleted from server");
        }
      });
    }

    const media = imageUrl;

    // All fields are required
    if (!userId || !receiverId) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    const newMessage = {
      senderId: userId,
      senderModel,
      receiverId,
      receiverModel,
      message,
      media,
    };
    const createMessage = await Chat.create(newMessage);

    return res
      .status(200)
      .json({ message: "Message sent successfully!", data: createMessage });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Sender and receiver IDs are required",
      });
    }
    const chatHistory = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json({
      success: true,
      data: chatHistory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.GroupMessageHistory = async (req, res) => {
  try {
    const chat = await groupChatModel.find();

    return res.status(200).json({
      messages: chat,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.sendGroupMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    const newChat = {
      senderId: req.user.id,
      senderProfile: req.user.profileImage,
      senderName: req.user.Full_name,
      senderModel: req.user.Resident_status,
      message: message,
    };

    const chat = await groupChatModel.create(newChat);

    return res.status(200).json({
      message: "message sent successfully",
      chat: chat,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
