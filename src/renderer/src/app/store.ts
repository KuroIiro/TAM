import { configureStore } from "@reduxjs/toolkit";
import roomIdReducer from "../features/chat/roomId";
 
export const store = configureStore({
  reducer: {
    roomId: roomIdReducer,
  },
});