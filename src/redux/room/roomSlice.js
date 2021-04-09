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
    storeSuccess: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
    },
    updateSuccess: (state, action) => {
      const { id, room: updatedRoom } = action.payload;

      const newRooms = state.rooms.map((room) => {
        if (room.room_id === id) {
          return updatedRoom;
        }

        return room;
      });

      state.rooms = [...newRooms];
    },
    destroySuccess: (state, action) => {
      const newRooms = state.bookings.filter((booking) => booking.book_id !== action.payload);

      state.rooms = [...newRooms];
    },
  }
});

export default roomSlice.reducer;

// Actions
const {
  fetchAllSuccess,
  fetchRoomsStatusSuccess,
  storeSuccess,
  updateSuccess,
  destroySuccess,
} = roomSlice.actions;

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

export const store = (data, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/rooms', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    dispatch(storeSuccess(res.data));

    navigate('/app/rooms');
  } catch (error) {
    console.log(error);
  }
};

export const update = (id, data, navigate) => async (dispatch) => {
  try {
    const res = await api.put(`/rooms/${id}`, data);

    dispatch(updateSuccess({ id, room: res.data.room }));

    navigate('/app/rooms');
  } catch (error) {
    console.log(error);
  }
};

export const destroy = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/rooms/${id}`);
    console.log(res);

    dispatch(destroySuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
