import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const roomGroupSlice = createSlice({
  name: 'roomGroup',
  initialState: {
    roomGroup: {},
    roomGroups: []
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.roomGroups = action.payload;
    }
  }
});

export default roomGroupSlice.reducer;

// Actions
const { fetchAllSuccess } = roomGroupSlice.actions;

export const fetchRoomGroupAll = () => async (dispatch) => {
  try {
    const res = await api.get('/room-groups');

    return dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
