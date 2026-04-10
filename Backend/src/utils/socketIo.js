const { Server } = require("socket.io");
const Question = require("../models/CommunityQuestion.model");
module.exports = (server) => {
  const io = new Server(server, {
    // cors: {
    //     origin: "*",
    //     methods: ["GET", "POST"],
    //     credentials: true,
    // },
  });
  io.on("connection", (socket) => {
    // connect users
    socket.on("join", ({ userId, receiverId }) => {
      socket.userId = userId;
      socket.receiverId = receiverId;
    });

    // send message
    socket.on("sendMessage", ({ userId, receiverId, message, media }) => {
      // add media
      const newMessage = { userId, receiverId, message, media };

      io.to(socket.id).emit("sendMessage", newMessage);
      const receiverSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.userId === receiverId
      );

      if (receiverSocket) {
        console.log(newMessage);
        receiverSocket.emit("sendMessage", newMessage);
      }
    });

    // Listen group messages
    socket.on("group-message", (data) => {
      io.emit("receive_message", data);
    });

    socket.on("video-offer", ({ senderId, receiverId, sdp }) => {
      if (senderId === receiverId) {
        socket.emit("error", { message: "You cannot call yourself!" });
        return;
      }

      const receiverSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.userId === receiverId
      );

      if (receiverSocket) {
        receiverSocket.emit("video-offer", { senderId, sdp });
      }
    });

    // Video Call - Answer
    socket.on("video-answer", ({ senderId, sdp }) => {
      const senderSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.userId === senderId
      );

      if (senderSocket) {
        senderSocket.emit("video-answer", { sdp });
      }
    });

    // Video Call - ICE Candidate
    socket.on("ice-candidate", ({ targetId, candidate }) => {
      const targetSocket = Array.from(io.sockets.sockets.values()).find(
        (s) => s.userId === targetId
      );

      if (targetSocket) {
        targetSocket.emit("ice-candidate", { candidate });
      }
    });

    // community
    // Handle creating a question
    socket.on("createQuestion", async (data) => {
      const { question, createdBy } = data;

      if (!question) {
        return socket.emit("error", { message: "Question is required" });
      }

      try {
        const newQuestion = new Question({
          question,
          createdBy,
        });

        await newQuestion.save();

        // Broadcast the new question to all connected clients
        io.emit("newQuestion", newQuestion);
      } catch (error) {
        console.error("Error creating question:", error);
        socket.emit("error", { message: "Error creating question" });
      }
    });

    // Handle adding an answer
    socket.on("addAnswer", async ({ questionId, answer }) => {
      if (!answer) {
        return socket.emit("error", { message: "Answer is required" });
      }

      try {
        const question = await Question.findById(questionId);

        if (!question) {
          return socket.emit("error", { message: "Question not found" });
        }

        question.ans.push({ answer });
        await question.save();

        // Notify all clients about the updated question
        io.emit("updateQuestion", question);
      } catch (error) {
        console.error("Error adding answer:", error);
        socket.emit("error", { message: "Error adding answer" });
      }
    });

    // Handle upvotes
    socket.on("upVote", async ({ questionId }) => {
      try {
        const question = await Question.findById(questionId);

        if (!question) {
          return socket.emit("error", { message: "Question not found" });
        }

        question.upVote += 1;
        await question.save();

        // Notify all clients about the updated question
        io.emit("updateQuestion", question);
      } catch (error) {
        console.error("Error updating upvote:", error);
        socket.emit("error", { message: "Error updating upvote" });
      }
    });

    // Handle downvotes
    socket.on("downVote", async ({ questionId }) => {
      try {
        const question = await Question.findById(questionId);

        if (!question) {
          return socket.emit("error", { message: "Question not found" });
        }

        question.downVote += 1;
        await question.save();

        // Notify all clients about the updated question
        io.emit("updateQuestion", question);
      } catch (error) {
        console.error("Error updating downvote:", error);
        socket.emit("error", { message: "Error updating downvote" });
      }
    });

    io.on("disconnect", () => {
      console.log("user disconnect!");
    });
  });
};
