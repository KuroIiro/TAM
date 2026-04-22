import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
const initialState = {
  roomId: '',
};
 
export const roomIdSlice = createSlice({
  name: "roomId",
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
      console.log('state.roomId', state.roomId, 'action.payload', action.payload)
    },
  },
});
 
export const { setRoomId } = roomIdSlice.actions;
 
export default roomIdSlice.reducer;