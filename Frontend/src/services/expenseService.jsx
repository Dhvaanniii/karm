import api from "./Api";

// create new Expense
export const CreateExpense = async (data) => {
  const response = await api.post("/v2/financial/addexpense", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// get all Expense
export const GetExpenses = async () =>
  await api.get("/v2/financial/viewexpense");

// get single Expense by id
export const GetExpense = async (id) =>
  await api.get(`/v2/financial/expense/${id}`);

// delete Expense by id
export const DeleteExpense = async (id) =>
  await api.delete(`/v2/financial/expense/${id}`);

//update Expense by id
export const UpdateExpense = async (id, data) => {
  const response = await api.patch(`/v2/financial/expense/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
