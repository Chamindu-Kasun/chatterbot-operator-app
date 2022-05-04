import { createSlice } from "@reduxjs/toolkit";

export const currentChatSlice = createSlice({
  name: "currentChat",
  initialState: {
    currentChat: null,
  },
  reducers: {
    addCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { addCurrentChat } = currentChatSlice.actions;
export default currentChatSlice.reducer;
