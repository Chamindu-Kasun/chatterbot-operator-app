import { createSlice } from "@reduxjs/toolkit";

export const onlineOperatorsSlice = createSlice({
  name: "onlineOperators",
  initialState: {
    operators: [],
    selectedOperator: [],
  },
  reducers: {
    addOnlineOperators: (state, action) => {
      state.operators = action.payload;
    },
    addSelectedOperator: (state, action) => {
      state.selectedOperator = action.payload;
    },
  },
});

export const { addOnlineOperators, addSelectedOperator } =
  onlineOperatorsSlice.actions;
export default onlineOperatorsSlice.reducer;
