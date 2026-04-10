const ChatController = require("../controller/chat.controller");
const { auth } = require("../middleware/auth");
const router = require("express").Router();
const upload = require("../utils/Owner.images");

// send message
router.post(
  "/sendMessage",
  auth,
  upload.single("media"),
  ChatController.sendMessage
);

// get chat history
router.get("/getChatHistory", auth, ChatController.getChatHistory);

// send Group message
router.post("/sendGroupMessage", auth, ChatController.sendGroupMessage);

// get group chat history
router.get("/groupMessageHistory", auth, ChatController.GroupMessageHistory);

module.exports = router;
