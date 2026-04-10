import api from "./Api";

// Create society
export const createSociety = async (data) =>
  await api.post("/v1/society/addSociety", data);

// Get all societies
export const getSocieties = async () =>
  await api.get("/v1/society/viewSociety");

// Register
export const registerUser = async (data) =>
  await api.post("/v1/auth/signup", data);

// Login
export const loginUser = async (data) => await api.post("/v1/auth/login", data);

// Logout
export const logoutUser = async () => await api.get("/v1/auth/logout");

// Send otp
export const sendOtp = async (data) => await api.post("/v1/auth/sendotp", data);

// Verify otp
export const verifyOtp = async (data) =>
  await api.post("/v1/auth/verifyotp", data);

// Reset password
export const resetPasswords = async (data) =>
  await api.post("/v1/auth/reset", data);

// Update user profile
export const UpdateUserProfile = async (userId, data) => {
  const response = await api.patch(`/v1/auth/${userId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
// View user profile
export const ViewUserProfile = async (userId) =>
  await api.get(`/v1/auth/${userId}`);
