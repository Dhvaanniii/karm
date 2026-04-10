import api from "./Api";

// send message
export const SendMessage = async (data) => {
  const response = api.post("/v2/chat/sendMessage", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// send group chat
export const SendGroupMessage = async (data) => {
  const response = api.post("/v2/chat/sendGroupMessage", data);
  return response;
};

// Get messages history
export const GetChatHistory = async (data) =>
  api.get(
    `/v2/chat/getChatHistory?senderId=${data.senderId}&receiverId=${data.receiverId}`
  );

// group chat history
export const groupMessageHistory = async () =>
  api.get("/v2/chat/groupMessageHistory");
