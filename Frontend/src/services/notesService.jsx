import api from "./Api";

// create new Note
export const CreateNote = async (data) =>
  await api.post("/v2/financial/addnote", data);

// get all Note
export const GetNotes = async () => await api.get("/v2/financial/viewnote");

// get single Note by id
export const GetNote = async (id) => await api.get(`/v2/financial/note/${id}`);

// delete Note by id
export const DeleteNote = async (id) =>
  await api.delete(`/v2/financial/note/${id}`);

//update Note by id
export const UpdateNote = async (id, data) =>
  await api.patch(`/v2/financial/note/${id}`, data);
