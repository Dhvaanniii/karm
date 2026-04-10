import api from "./Api";

// Add imp number
export const AddImpNumber = async (data) =>
  await api.post("/v2/number/createnumber", data);

// get all imp numbers
export const GetImpNumbers = async () => await api.get("/v2/number/viewnumber");

// get imp number by id
export const GetImpNumber = async (id) => await api.get(`/v2/number/${id}`);

// update imp number by id
export const UpdateImpNumber = async (id, data) =>
  await api.patch(`/v2/number/${id}`, data);

// delete imp number by id
export const DeleteImpNumber = async (id) =>
  await api.delete(`/v2/number/${id}`);
