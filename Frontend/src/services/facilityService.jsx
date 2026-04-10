import api from "./Api";

// create new Facility
export const CreateFacility = async (data) =>
  await api.post("/v2/facility/addfacility", data);

// get all Facilities
export const GetFacilities = async () =>
  await api.get("/v2/facility/viewfacility");

// get single Facility by id
export const GetFacility = async (id) =>
  await api.get(`/v2/facility/${id}`);

// delete Facility by id
export const DeleteFacility = async (id) =>
  await api.delete(`/v2/facility/${id}`);

// update Facility by id
export const UpdateFacility = async (id, data) =>
  await api.patch(`/v2/facility/${id}`, data);
