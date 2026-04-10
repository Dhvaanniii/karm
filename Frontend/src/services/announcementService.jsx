import api from "./Api";

// create new Announcement
export const CreateAnnouncement = async (data) =>
  await api.post("/v2/announcement/addannouncement", data);

// get all Announcement
export const GetAnnouncements = async () =>
  await api.get("/v2/announcement/viewannouncment");

// get single Announcement by id
export const GetAnnouncement = async (id) =>
  await api.get(`/v2/announcement/${id}`);

// delete Announcement by id
export const DeleteAnnouncement = async (id) =>
  await api.delete(`/v2/announcement/${id}`);

//update Announcement by id
export const UpdateAnnouncement = async (id, data) =>
  await api.patch(`/v2/announcement/${id}`, data);

// get all activity from announcement
export const GetActivityAnnouncement = async () =>
  await api.get("/v2/announcement/acitivity/getannouncement");

// Accept announcement
export const AcceptAnnouncement = async (data) =>
  await api.post("/v2/announcement/accept-announcement", data);

// get event participants
export const GetEventParticipants = async () =>
  await api.get("/v2/announcement/event/participants");

// get activity participants
export const GetActivityParticipants = async () =>
  await api.get("/v2/announcement/activity/participants");
