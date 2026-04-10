import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/AuthSlice";
import residentSlice from "./features/ResidentSlice";
import loaderSlice from "./features/LoaderSlice";
import notificationSlice from "./features/notificationSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["auth"],
};

const authReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: authReducer,
    resident: residentSlice,
    loader: loaderSlice,
    notification: notificationSlice,
  },
});

export default store;
export const authPersist = persistStore(store);
