import {
  createConversationStart,
  createConversationSuccess,
  createConversationFailure,
} from "../slice/converationSlice";
import axios from "axios";

export const createConversation = async (dispatch, conversation) => {
  dispatch(createConversationStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/operator/transfer",
      conversation
    );
    dispatch(createConversationSuccess(res.data));
  } catch (err) {
    dispatch(createConversationFailure());
  }
};
