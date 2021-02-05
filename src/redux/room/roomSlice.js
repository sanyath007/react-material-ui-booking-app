import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    room: {},
    rooms: []
  },
  reducers: {
    fetchRoomAll: (state, action) => {
      state.rooms = action.payload;
    }
  }
});

export default roomSlice.reducer;

//Actions
export const { fetchRoomAll } = roomSlice.actions;
