import api from "./Api";

// Get all notification for login user
export const GetNotifications = async () =>
  await api.get("/v2/notication/notifications");

// Delete notification by id
export const DeleteNotification = async (id) =>
  await api.delete(`/v2/notication//notifications/${id}`);

// Delete all notification
export const ClearNotification = async () =>
  await api.delete("/v2/notication/deleteAll");
