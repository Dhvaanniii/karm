import api from "./Api";

// Total Income
export const TotalIncome = async () =>
  api.get("/v2/financial/totalMaintenanceDone");

// Total Expense
export const TotalExpense = async () =>
  api.get("/v2/financial/ex/expense/total-amount");

// Total Unit
export const TotalUnit = async () =>
  api.get("/v2/resident/unit/total-occupied-units");
