import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
const initialState = {
  namzData: null,
  namzUpdateDateTime: null,
};

export const mainCacheSlice = createSlice({
  name: "mainCache",
  initialState: initialState,
  reducers: {
    reset: (state, action) => {
      Object.assign(state, initialState);
    },
    updateNamzData: (state, action) => {
      state.namzData = action.payload ? action.payload : "";
      var currentTime = Date.now();
      state.namzUpdateDateTime = moment(Date.now()).format(
        "YYYY-MMM-DD HH:mm:ss"
      );
      console.log(state);
    },
    updateNamzUpdateDateTime: (state, action) => {
      var currentTime = new Date.now();
      state.namzUpdateDateTime = currentTime.toString();
    },
  },
});

export const { reset, updateNamzData, updateNamzUpdateDateTime } =
  mainCacheSlice.actions;

export default mainCacheSlice.reducer;
