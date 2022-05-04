import { createSlice } from "@reduxjs/toolkit";

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //Create / Update
    createConversationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createConversationSuccess: (state, action) => {
      state.isFetching = false;
      state.conversations.push(action.payload);
    },
    createConversationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  createConversationStart,
  createConversationSuccess,
  createConversationFailure,
} = conversationSlice.actions;

export default conversationSlice.reducer;
