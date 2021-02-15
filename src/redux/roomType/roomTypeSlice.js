import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const roomTypeSlice = createSlice({
  name: 'roomType',
  initialState: {
    roomType: {},
    roomTypes: []
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.roomTypes = action.payload;
    }
  }
});

export default roomTypeSlice.reducer;

// Actions
const { fetchAllSuccess } = roomTypeSlice.actions;

export const fetchRoomTypeAll = () => async (dispatch) => {
  try {
    const res = await api.get('/room-types');

    return dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
