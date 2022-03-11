import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import errorHandler from 'src/utils/responseErrorHandler';
import { fetchStatus as fetchRoomsStatus } from '../room';
import api from '../../api';

export const fetchAllAsync = createAsyncThunk('booking/fetchAll', async ({ qs }) => {
  try {
    const res = await api.get(`/bookings${qs}`);

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
});

export const fetchAllWithPageAsync = createAsyncThunk('booking/fetchAll', async ({ url }) => {
  try {
    const res = await api.get(url);

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
});

export const fetchById = createAsyncThunk('booking/fetchById', async ({ id }) => {
  try {
    const res = await api.get(`/bookings/${id}`);

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
});

export const fetchByAn = createAsyncThunk('booking/fetchByAn', async ({ an }) => {
  try {
    const res = await api.get(`/bookings/an/${an}`);

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
});

export const fetchHistories = createAsyncThunk('booking/fetchHistories', async ({ id, hn }) => {
  try {
    const res = await api.get(`/bookings/${id}/${hn}/histories`);

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
});

export const storeAsync = createAsyncThunk('booking/store', async ({ data, navigate }, { dispatch }) => {
  try {
    await api.post('/bookings', data);

    Swal.fire({
      icon: 'success',
      title: 'บันทึกข้อมูลเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(fetchAllAsync({ qs: '' }));

    navigate('/viproom/app/bookings', { replace: true });
  } catch (err) {
    if (err.response.status === 409) {
      Swal.fire({
        icon: 'error',
        title: 'ผู้ป่วยมีการจองห้องพิเศษอยู่แล้ว !!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'พบข้อผิดพลาด !!',
        showConfirmButton: false,
        timer: 1500
      });
    }

    return new Promise((resolve, reject) => reject(err));
  }
});

export const updateAsync = createAsyncThunk('booking/update', async ({ id, data, navigate }) => {
  try {
    const res = await api.put(`/bookings/${id}`, data);

    Swal.fire({
      icon: 'success',
      title: 'แก้ไขข้อมูลเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    navigate('/viproom/app/bookings', { replace: true });

    return { id, booking: res.data.booking };
  } catch (err) {
    errorHandler(err);
  }
});

export const destroy = createAsyncThunk('booking/destroy', async ({ id, navigate }, { dispatch }) => {
  try {
    await api.delete(`/bookings/${id}`);

    Swal.fire({
      icon: 'success',
      title: 'ลบข้อมูลเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(fetchAllAsync({ qs: '' }));

    navigate('/viproom/app/bookings', { replace: true });
  } catch (err) {
    errorHandler(err);
  }
});

export const cancel = createAsyncThunk('booking/cancel', async ({ id, user, navigate }, { dispatch }) => {
  try {
    const res = await api.put(`/bookings/${id}/cancel`, { user });
    console.log(res);

    Swal.fire({
      icon: 'success',
      title: 'ยกเลิกการจองห้องเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(fetchAllAsync({ qs: '' }));

    navigate('/viproom/app/bookings', { replace: true });
  } catch (err) {
    errorHandler(err);
  }
});

export const discharge = createAsyncThunk('booking/cancel', async ({ id, user, navigate }, { dispatch }) => {
  try {
    const res = await api.put(`/bookings/${id}/discharge`, { user });
    console.log(res);

    Swal.fire({
      icon: 'success',
      title: 'จำหน่ายผู้ป่วยเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(fetchAllAsync({ qs: '' }));

    navigate('/viproom/app/bookings', { replace: true });
  } catch (err) {
    errorHandler(err);
  }
});

export const checkin = createAsyncThunk('booking/checkin', async ({ data, navigate }) => {
  try {
    const res = await api.post('/bookings/checkin', data);

    Swal.fire({
      icon: 'success',
      title: 'บันทึกรับผู้ป่วยเข้าห้องเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    navigate('/viproom/app/status');

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
});

export const checkout = createAsyncThunk('booking/checkout', async ({ bookId, roomId, user }, { dispatch }) => {
  try {
    await api.put(`/bookings/${bookId}/${roomId}/checkout`, { user });

    Swal.fire({
      icon: 'success',
      title: 'จำหน่ายผู้ป่วยออกจากห้องเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(fetchRoomsStatus());
  } catch (err) {
    errorHandler(err);
  }
});

export const cancelCheckin = createAsyncThunk('booking/cancel', async ({ bookId, roomId, user }, { dispatch }) => {
  try {
    await api.put(`/bookings/${bookId}/${roomId}/cancel-checkin`, { user });

    Swal.fire({
      icon: 'success',
      title: 'ยกเลิกการรับผู้ป่วยเข้าห้องเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(fetchRoomsStatus());
  } catch (err) {
    errorHandler(err);
  }
});

export const changeRoom = createAsyncThunk('booking/changeRoom', async ({ bookId, newRoom, user }, { dispatch }) => {
  try {
    await api.put(`/bookings/${bookId}/change-room`, { user, new_room: newRoom });

    Swal.fire({
      icon: 'success',
      title: 'ย้ายห้องผู้ป่วยเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(fetchRoomsStatus());
  } catch (err) {
    errorHandler(err);
  }
});

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    booking: {},
    bookings: [],
    pager: null,
    loading: false,
    error: ''
  },
  reducers: {
    fetchHistoriesSuccess: (state, action) => {
      state.bookings = action.payload.items;
      state.pager = action.payload.pager;
    },
  },
  extraReducers: {
    [fetchAllAsync.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchAllAsync.fulfilled]: (state, action) => {
      const { items, pager } = action.payload;

      state.bookings = [...items];
      state.pager = pager;
      state.loading = false;
      state.error = '';
    },
    [fetchAllAsync.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.error;
    },
    [fetchAllWithPageAsync.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchAllWithPageAsync.fulfilled]: (state, action) => {
      const { items, pager } = action.payload;

      state.bookings = [...items];
      state.pager = pager;
      state.loading = false;
      state.error = '';
    },
    [fetchAllWithPageAsync.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.error;
    },
    [fetchById.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchById.fulfilled]: (state, action) => {
      state.booking = action.payload;
      state.loading = false;
      state.error = '';
    },
    [fetchById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchByAn.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchByAn.fulfilled]: (state, action) => {
      state.booking = action.payload;
      state.loading = false;
      state.error = '';
    },
    [fetchByAn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchHistories.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchHistories.fulfilled]: (state, action) => {
      const { items, pager } = action.payload;

      state.bookings = [...items];
      state.pager = pager;
      state.loading = false;
      state.error = '';
    },
    [fetchHistories.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.error;
    },
    [storeAsync.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [storeAsync.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
    },
    [storeAsync.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.error = action.error;
    },
    [updateAsync.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [updateAsync.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
    },
    [updateAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [destroy.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [destroy.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
    },
    [destroy.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [cancel.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [cancel.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
    },
    [cancel.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [discharge.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [discharge.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
    },
    [discharge.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [checkin.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [checkin.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
    },
    [checkin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [checkout.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [checkout.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
    },
    [checkout.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [cancelCheckin.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [cancelCheckin.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
    },
    [cancelCheckin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [changeRoom.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [changeRoom.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
    },
    [changeRoom.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

export default bookingSlice.reducer;
