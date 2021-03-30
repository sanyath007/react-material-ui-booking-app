import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    room: {},
    rooms: [],
    floor1: [],
    floor2: [],
    floor3: [],
    usedRooms: [],
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.rooms = action.payload;
    },
    fetchRoomsStatusSuccess: (state, action) => {
      state.floor1 = action.payload.rooms.filter((room) => parseInt(room.floor, 10) === 1);
      state.floor2 = action.payload.rooms.filter((room) => parseInt(room.floor, 10) === 2);
      state.floor3 = action.payload.rooms.filter((room) => parseInt(room.floor, 10) === 3);

      state.usedRooms = action.payload.usedRooms;
    },
    addSuccess: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
    }
  }
});

export default roomSlice.reducer;

// Actions
const { fetchAllSuccess, fetchRoomsStatusSuccess, addSuccess } = roomSlice.actions;

export const fetchRoomAll = () => async (dispatch) => {
  try {
    const res = await api.get('/rooms');

    return dispatch(fetchAllSuccess(res.data.items));
  } catch (error) {
    console.log(error);
  }
};

export const fetchRoomsStatus = () => async (dispatch) => {
  try {
    const res = await api.get('/rooms-status');

    return dispatch(fetchRoomsStatusSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const addRoom = (data) => async (dispatch) => {
  try {
    const res = await api.post('/rooms', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(res);

    dispatch(addSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
