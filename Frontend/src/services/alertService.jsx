import api from "./Api";

// create alert
export const CreateAlert = async (data) =>
  await api.post("/v2/alert/addalert", data);

// get alerts
export const GetAlerts = async () => await api.get("/v2/alert/viewalert");
