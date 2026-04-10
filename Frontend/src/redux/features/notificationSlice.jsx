import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationList: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // all notifications
    allNotification: (state, action) => {
      state.notificationList = action.payload;
    },

    // add new notification
    addNewNotification: (state, action) => {
      state.notificationList.push(action.payload); //
    },

    // delete notification by id
    deleteNotification: (state, action) => {
      state.notificationList = state.notificationList.filter(
        (v) => v._id !== action.payload
      );
    },

    // clear notifications
    clearNotifications: (state) => {
      state.notificationList = [];
    },
  },
});

export const {
  allNotification,
  addNewNotification,
  deleteNotification,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
