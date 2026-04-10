import api from "./Api";

// create new Request
export const CreateRequest = async (data) =>
  await api.post("/v2/complaint/addrequest", data);

// get all Request
export const GetRequests = async () =>
  await api.get("/v2/complaint/viewrequest");

// get single Request by id
export const GetRequest = async (id) =>
  await api.get(`/v2/complaint/request/${id}`);

// delete Request by id
export const DeleteRequest = async (id) =>
  await api.delete(`/v2/complaint/request/${id}`);

//update Request by id
export const UpdateRequest = async (id, data) =>
  await api.patch(`/v2/complaint/request/${id}`, data);

// get requests for spacific user
export const GetRequestsForUser = async () =>
  await api.get("/v2/complaint/getuserrequest");
