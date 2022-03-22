import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { responsedErrorHandler } from 'src/utils';
import api from '../../api';

export const fetchRooms = createAsyncThunk('room/fetchRooms', async () => {
  try {
    const res = await api.get('/rooms');

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

export const fetchRoom = createAsyncThunk('room/fetchRoom', async ({ id }) => {
  try {
    const res = await api.get(`/rooms/${id}`);

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

export const fetchStatus = createAsyncThunk('room/fetchStatus', async () => {
  try {
    const res = await api.get('/rooms-status');

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

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
    loading: false,
    error: ''
  },
  reducers: {
    filterRoomsByBuilding: (state, action) => {
      state.filteredRooms = state.rooms.filter((room) => {
        return room.building?.building_id === action.payload;
      });
    },
    filterRoomsByFloor: (state, action) => {
      if (action.payload) {
        state.filteredRooms = state.rooms.filter((room) => {
          return room.floor === action.payload;
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
      const newRooms = state.rooms.filter((room) => room.room_id !== action.payload);

      state.rooms = [...newRooms];
      state.filteredRooms = [...newRooms];
    },
  },
  extraReducers: {
    [fetchRooms.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchRooms.fulfilled]: (state, action) => {
      state.filteredRooms = action.payload.items;
      state.rooms = action.payload.items;
      state.pager = action.payload.pager;
      state.loading = false;
    },
    [fetchRooms.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchRoom.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchRoom.fulfilled]: (state, action) => {
      state.room = action.payload;
      state.loading = false;
    },
    [fetchRoom.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchStatus.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchStatus.fulfilled]: (state, action) => {
      state.floor1 = action.payload.rooms.filter((room) => parseInt(room.floor, 10) === 1);
      state.floor2 = action.payload.rooms.filter((room) => parseInt(room.floor, 10) === 2);
      state.floor3 = action.payload.rooms.filter((room) => parseInt(room.floor, 10) === 3);
      state.usedRooms = action.payload.checkedins;
      state.loading = false;
    },
    [fetchStatus.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

export default roomSlice.reducer;

// Actions
export const {
  filterRoomsByBuilding,
  filterRoomsByFloor,
  storeSuccess,
  updateFilteredRooms,
  updateSuccess,
  updateStatusSuccess,
  destroySuccess,
} = roomSlice.actions;

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

    navigate('/viproom/app/rooms');
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

    navigate('/viproom/app/rooms');
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

    navigate('/viproom/app/rooms');
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

    dispatch(destroySuccess(id));
  } catch (error) {
    console.log(error);
  }
};

export const getRoomsById = (state, id) => {
  return state.room.rooms.find((room) => room.room_id === id);
};
