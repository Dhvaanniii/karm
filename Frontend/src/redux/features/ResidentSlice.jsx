import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resident: null,
};

const residentSlice = createSlice({
  name: "resident",
  initialState,
  reducers: {
    StoreResident: (state, action) => {
      state.resident = action.payload;
    },
    ClearResident: (state) => {
      state.resident = null;
    },
  },
});

export const { StoreResident, ClearResident } = residentSlice.actions;
export default residentSlice.reducer;
