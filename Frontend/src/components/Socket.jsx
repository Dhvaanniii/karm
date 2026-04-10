import { io } from "socket.io-client";
import Constant from "../config/Constant";

export const socket = io(Constant.SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});
