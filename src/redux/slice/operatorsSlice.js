import { createSlice } from "@reduxjs/toolkit";

export const operatorsSlice = createSlice({
  name: "operators",
  initialState: {
    operators: [],
  },
  reducers: {
    addOperators: (state, action) => {
      state.operators = action.payload;
    },
  },
});

export const { addOperators } = operatorsSlice.actions;
export default operatorsSlice.reducer;
