import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const roomTypeSlice = createSlice({
  name: 'room',
  initialState: {
    roomType: {},
    roomTypes: []
  },
  reducers: {
    fetchRoomTypeAllSuccess: (state, action) => {
      state.roomTypes = action.payload;
    }
  }
});

export default roomTypeSlice.reducer;

// Actions
const { fetchRoomTypeAllSuccess } = roomTypeSlice.actions;

export const fetchRoomTypeAll = () => async (dispatch) => {
  try {
    const res = await api.get('/room-types');

    return dispatch(fetchRoomTypeAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
