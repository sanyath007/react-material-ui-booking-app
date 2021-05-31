import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import api from '../../api';

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    room: {},
    rooms: [],
    filteredRooms: [],
    floor1: [],
    floor2: [],
    floor3: [],
    usedRooms: [],
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.rooms = action.payload;
      state.filteredRooms = state.rooms;
    },
    fetchByIdSuccess: (state, action) => {
      state.room = action.payload;
    },
    fetchRoomsStatusSuccess: (state, action) => {
      state.floor1 = action.payload.rooms.filter((room) => parseInt(room.floor, 10) === 1);
      state.floor2 = action.payload.rooms.filter((room) => parseInt(room.floor, 10) === 2);
      state.floor3 = action.payload.rooms.filter((room) => parseInt(room.floor, 10) === 3);

      state.usedRooms = action.payload.usedRooms;
    },
    filterRoomByFloorSuccess: (state, action) => {
      if (action.payload) {
        state.filteredRooms = state.rooms.filter((room) => {
          return parseInt(room.floor, 10) === action.payload;
        });
      } else {
        state.filteredRooms = state.rooms;
      }
    },
    storeSuccess: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
    },
    updateFilteredRooms: (state, action) => {
      const { id, room: updatedRoom } = action.payload;

      const newRooms = state.filteredRooms.map((room) => {
        if (room.room_id === id) {
          return updatedRoom;
        }

        return room;
      });

      state.filteredRooms = [...newRooms];
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
    updateStatusSuccess: (state, action) => {
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
  fetchByIdSuccess,
  fetchRoomsStatusSuccess,
  filterRoomByFloorSuccess,
  storeSuccess,
  updateFilteredRooms,
  updateSuccess,
  updateStatusSuccess,
  destroySuccess,
} = roomSlice.actions;

export const fetchRoomAll = () => async (dispatch) => {
  try {
    const res = await api.get('/rooms');

    dispatch(fetchAllSuccess(res.data.items));
  } catch (error) {
    console.log(error);
  }
};

export const fetchById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/rooms/${id}`);

    dispatch(fetchByIdSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchRoomsStatus = () => async (dispatch) => {
  try {
    const res = await api.get('/rooms-status');

    dispatch(fetchRoomsStatusSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const filterRoomsByFloor = (floor = '') => async (dispatch) => {
  dispatch(filterRoomByFloorSuccess(floor));
};

export const store = (data, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/rooms', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    Swal.fire({
      icon: 'success',
      title: 'บันทึกข้อมูลเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
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

    Swal.fire({
      icon: 'success',
      title: 'แก้ไขข้อมูลเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(updateSuccess({ id, room: res.data.room }));
    dispatch(updateFilteredRooms({ id, room: res.data.room }));

    navigate('/app/rooms');
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = (id, status, navigate) => async (dispatch) => {
  try {
    const res = await api.put(`/rooms/${id}/${status}`);

    Swal.fire({
      icon: 'success',
      title: 'แก้ไขข้อมูลสถานะห้องเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(updateStatusSuccess({ id, room: res.data.room }));
    dispatch(updateFilteredRooms({ id, room: res.data.room }));

    navigate('/app/rooms');
  } catch (error) {
    console.log(error);
  }
};

export const destroy = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/rooms/${id}`);
    console.log(res);

    Swal.fire({
      icon: 'success',
      title: 'ลบข้อมูลเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(destroySuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
