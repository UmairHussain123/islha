import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
const initialState = {
  pFundData: null,
  pFundUpdateDateTime: null,
};

export const mainCacheSlice = createSlice({
  name: "mainCache",
  initialState: initialState,
  reducers: {
    reset: (state, action) => {
      Object.assign(state, initialState);
    },
    // updatePFundData: (state, action) => {
    //   state.pFundData = action.payload ? action.payload : "";
    //   var currentTime = Date.now();
    //   state.pFundUpdateDateTime = moment(Date.now()).format(
    //     "YYYY-MMM-DD HH:mm:ss"
    //   );
    //   console.log(state);
    // },
    // updatePFundUpdateDateTime: (state, action) => {
    //   var currentTime = new Date.now();
    //   state.pFundUpdateDateTime = currentTime.toString();
    // },
  },
});

export const { reset, updatePFundData, updatePFundUpdateDateTime } =
  mainCacheSlice.actions;

export default mainCacheSlice.reducer;
