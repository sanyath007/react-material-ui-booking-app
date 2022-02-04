import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import api from '../../api';
import { fetchRoomsStatus } from '../room/roomSlice';

export const fetchAllAsync = createAsyncThunk('booking/fetchAll', async ({ qs }) => {
  try {
    const res = await api.get(`/bookings${qs}`);

    return res.data;
  } catch (err) {
    if ([400, 401, 403, 404, 409, 500].includes(err.response.status)) {
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

export const fetchAllWithPageAsync = createAsyncThunk('booking/fetchAll', async ({ url }) => {
  try {
    const res = await api.get(url);

    return res.data;
  } catch (err) {
    if ([400, 401, 403, 404, 409, 500].includes(err.response.status)) {
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
    if ([400, 401, 403, 404, 409, 500].includes(err.response.status)) {
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
    if ([400, 401, 403, 404, 409, 500].includes(err.response.status)) {
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
    fetchBookingฺByIdSuccess: (state, action) => {
      state.booking = action.payload;
    },
    fetchBookingฺByAnSuccess: (state, action) => {
      state.booking = action.payload;
    },
    fetchHistoriesSuccess: (state, action) => {
      state.bookings = action.payload.items;
      state.pager = action.payload.pager;
    },
    cancelSuccess: (state, action) => {
      const newBookings = state.bookings.filter((booking) => booking.book_id !== action.payload);

      state.bookings = [...newBookings];
    },
    dischargeSuccess: (state, action) => {
      const newBookings = state.bookings.filter((booking) => booking.book_id !== action.payload);

      state.bookings = [...newBookings];
    },
    checkinSuccess: (state, action) => {
      const newBookings = state.bookings.filter((booking) => {
        return booking.book_id !== action.payload.book_id;
      });

      state.bookings = [...newBookings];
    },
    checkoutSuccess: (state) => {
      return state;
    },
    cancelCheckinSuccess: (state) => {
      return state;
    }
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
    }
  }
});

export default bookingSlice.reducer;

// Actions
const {
  fetchBookingฺByIdSuccess,
  fetchBookingฺByAnSuccess,
  fetchHistoriesSuccess,
  cancelSuccess,
  dischargeSuccess,
  checkinSuccess,
  checkoutSuccess,
  cancelCheckinSuccess,
} = bookingSlice.actions;

export const fetchBookingฺById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/bookings/${id}`);

    return dispatch(fetchBookingฺByIdSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookingฺByAn = (an) => async (dispatch) => {
  try {
    const res = await api.get(`/bookings/an/${an}`);

    return dispatch(fetchBookingฺByAnSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchHistories = (id, hn) => async (dispatch) => {
  try {
    const res = await api.get(`/bookings/${id}/${hn}/histories`);
    console.log(res);
    return dispatch(fetchHistoriesSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const cancel = (id, navigate) => async (dispatch) => {
  try {
    const res = await api.put(`/bookings/${id}/cancel`);
    console.log(res);

    Swal.fire({
      icon: 'success',
      title: 'ยกเลิกการจองห้องเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    navigate('/viproom/app/bookings');

    dispatch(cancelSuccess(id));
  } catch (error) {
    console.log(error);
  }
};

export const discharge = (id, navigate) => async (dispatch) => {
  try {
    const res = await api.put(`/bookings/${id}/discharge`);
    console.log(res);

    Swal.fire({
      icon: 'success',
      title: 'จำหน่ายผู้ป่วยเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    navigate('/viproom/app/bookings');

    dispatch(dischargeSuccess(id));
  } catch (error) {
    console.log(error);
  }
};

export const checkin = (data, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/bookings/checkin', data);
    console.log(res);

    Swal.fire({
      icon: 'success',
      title: 'บันทึกรับผู้ป่วยเข้าห้องเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    navigate('/viproom/app/status');

    dispatch(checkinSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const checkout = (bookId, roomId) => async (dispatch) => {
  try {
    const res = await api.put(`/bookings/${bookId}/${roomId}/checkout`);
    console.log(res);

    Swal.fire({
      icon: 'success',
      title: 'บันทึกรับผู้ป่วยออกจากห้องเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(checkoutSuccess());
    dispatch(fetchRoomsStatus());
  } catch (error) {
    console.log(error);
  }
};

export const cancelCheckin = (bookId, roomId) => async (dispatch) => {
  try {
    const res = await api.put(`/bookings/${bookId}/${roomId}/cancel-checkin`);
    console.log(res);

    Swal.fire({
      icon: 'success',
      title: 'ยกเลิกการรับผู้ป่วยเข้าห้องเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    dispatch(cancelCheckinSuccess());
    dispatch(fetchRoomsStatus());
  } catch (error) {
    console.log(error);
  }
};
