import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    room: {},
    rooms: []
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.rooms = action.payload;
    }
  }
});

export default roomSlice.reducer;

// Actions
const { fetchAllSuccess } = roomSlice.actions;

export const fetchRoomAll = () => async (dispatch) => {
  try {
    const res = await api.get('/rooms');

    return dispatch(fetchAllSuccess(res.data.items));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
