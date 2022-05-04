import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alert: null,
    // isFetching: false,
    // error: false,
  },
  reducers: {
    // //Get
    // getAleretStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // getAleretSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.alert = action.payload;
    // },
    // getAleretFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    // //Create
    // createAleretStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // createAleretSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.alert = [];
    // },
    // createAleretFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    addNewAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { addNewAlert } = alertSlice.actions;

export default alertSlice.reducer;
