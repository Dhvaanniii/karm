import api from "./Api";

// create new Maintenance
export const ConfirmPassword = async (data) =>
  await api.post("/v2/financial/checkpassword", data);

// create new Maintenance
export const CreateMaintenance = async (data) =>
  await api.post("/v2/financial/addmaintenance", data);

// get all Maintenance
export const GetMaintenances = async () =>
  await api.get("/v2/financial/viewmaintenance");

// get all Maintenance
export const GetPendingMaintenances = async () =>
  await api.get("/v2/financial/getuserandMaintance");

// Update Maintenance status by id
export const UpdateMaintenanceStatus = async (id, data) =>
  await api.put(`/v2/financial/maintenance/${id}/resident/payment`, data);

// get paid Maintenance list
export const GetPaidMaintenances = async () =>
  await api.get("/v2/financial/donemaintannace");

// download maintannace
export const DownloadMaintanance = async (data) => {
  try {
    const response = await api.post("/v2/financial/main/generate-pdf", data, {
      responseType: "blob", // Ensure that we receive the response as a file
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Error generating invoice."
    );
  }
};

// Approve Maintenance By Admin
export const ApproveMaintenanceByAdmin = async (
  maintenanceId,
  residentId,
  action
) =>
  await api.put(
    `/v2/financial/maintenance/${maintenanceId}/approveCashPayment/${residentId}`,
    { action }
  );
