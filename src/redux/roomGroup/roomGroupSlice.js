import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const roomGroupSlice = createSlice({
  name: 'room',
  initialState: {
    roomGroup: {},
    roomGroups: []
  },
  reducers: {
    fetchRoomGroupAllSuccess: (state, action) => {
      state.roomGroups = action.payload;
    }
  }
});

export default roomGroupSlice.reducer;

// Actions
const { fetchRoomGroupAllSuccess } = roomGroupSlice.actions;

export const fetchRoomGroupAll = () => async (dispatch) => {
  try {
    const res = await api.get('/room-groups');

    return dispatch(fetchRoomGroupAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
