import { configureStore } from "@reduxjs/toolkit";
import onlineOperatorsReducer from "./onlineOperators/onlineOperatorsSlice";
import currentChatReducer from "./currentChat/currentChatSlice";
import converstaionsReducer from "./slice/converationSlice";
import alertReducer from "./slice/alert";
import operatorsReducer from "./slice/operatorsSlice";

export const store = configureStore({
  reducer: {
    onlineOperators: onlineOperatorsReducer,
    currentChat: currentChatReducer,
    conversation: converstaionsReducer,
    alert: alertReducer,
    operators: operatorsReducer,
  },
});
