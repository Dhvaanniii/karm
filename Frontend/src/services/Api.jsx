import axios from "axios";
import Constant from "../config/Constant";

const api = axios.create({
  baseURL: Constant.BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;