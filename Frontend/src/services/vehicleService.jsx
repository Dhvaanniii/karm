import axios from "axios";

const API_URL = "http://localhost:3000/api/v2/vehicle";

// Set up axios instance with credentials for cookies
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Admin: Get all vehicles
export const getAllVehicles = async () => {
  const response = await api.get("/all");
  return response.data;
};

// Admin: Add vehicle
export const addVehicle = async (data) => {
  const response = await api.post("/add", data);
  return response.data;
};

// Admin: Update vehicle
export const updateVehicle = async (id, data) => {
  const response = await api.put(`/update/${id}`, data);
  return response.data;
};

// Admin: Delete vehicle
export const deleteVehicle = async (id) => {
  const response = await api.delete(`/delete/${id}`);
  return response.data;
};

// Resident: Get my vehicles
export const getMyVehicles = async () => {
  const response = await api.get("/my");
  return response.data;
};

// Resident: Get wing vehicles
export const getWingVehicles = async () => {
  const response = await api.get("/wing");
  return response.data;
};

// Resident: Add my vehicle
export const addResidentVehicle = async (data) => {
  const response = await api.post("/resident/add", data);
  return response.data;
};
