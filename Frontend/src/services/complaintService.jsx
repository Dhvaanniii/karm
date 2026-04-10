import api from "./Api";

// create new complaint
export const CreateComplaint = async (data) =>
  await api.post("/v2/complaint/addcomplaint", data);

// get all complaint
export const GetComplaints = async () =>
  await api.get("/v2/complaint/viewcomplaint");

// get single complaint by id
export const GetComplaint = async (id) =>
  await api.get(`/v2/complaint/complaint/${id}`);

// delete complaint by id
export const DeleteComplaint = async (id) =>
  await api.delete(`/v2/complaint/${id}`);

//update complaint by id
export const UpdateComplaint = async (id, data) =>
  await api.patch(`/v2/complaint/${id}`, data);

// get complaint for spacific user
export const GetComplaintsForUser = async () =>
  await api.get("/v2/complaint/getusercomplaint");
