import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import api from '../../api';
import { fetchRoomsStatus } from '../room/roomSlice';

export const storeAsync = createAsyncThunk('booking/store', async ({ data, navigate }) => {
  console.log(navigate);
  try {
    const res = await api.post('/bookings', data);

    Swal.fire({
      icon: 'success',
      title: 'บันทึกข้อมูลเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    return res.data.booking;

    // navigate('/viproom/app/bookings');
  } catch (error) {
    return error;
  }
});

export const updateAsync = createAsyncThunk('booking/update', async ({ id, data, navigate }) => {
  console.log(navigate);
  try {
    const res = await api.put(`/bookings/${id}`, data);

    Swal.fire({
      icon: 'success',
      title: 'แก้ไขข้อมูลเรียบร้อย !!',
      showConfirmButton: false,
      timer: 1500
    });

    return { id, booking: res.data.booking };

    // navigate('/viproom/app/bookings', { replace: true });
  } catch (error) {
    return error;
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
    fetchAllSuccess: (state, action) => {
      state.bookings = action.payload.items;
      state.pager = action.payload.pager;
    },
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
    destroySuccess: (state, action) => {
      const newBookings = state.bookings.filter((booking) => booking.book_id !== action.payload);

      state.bookings = [...newBookings];
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
    [storeAsync.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [storeAsync.fulfilled]: (state, action) => {
      state.bookings.push(action.payload);
      state.loading = false;
      state.error = '';
    },
    [storeAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    [updateAsync.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [updateAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      const { id, booking: updatedBooking } = action.payload;

      const newBookings = state.bookings.map((booking) => {
        if (booking.book_id === id) {
          return updatedBooking;
        }

        return booking;
      });

      state.bookings = [...newBookings];
      state.loading = false;
      state.error = '';
    },
    [updateAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    }
  }
});

export default bookingSlice.reducer;

// Actions
const {
  fetchAllSuccess,
  fetchBookingฺByIdSuccess,
  fetchBookingฺByAnSuccess,
  fetchHistoriesSuccess,
  destroySuccess,
  cancelSuccess,
  dischargeSuccess,
  checkinSuccess,
  checkoutSuccess,
  cancelCheckinSuccess,
} = bookingSlice.actions;

export const fetchBookingAll = (qs = '') => async (dispatch) => {
  try {
    const res = await api.get(`/bookings${qs}`);
    console.log(res);
    return dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllWithPage = (url) => async (dispatch) => {
  try {
    const res = await api.get(url);

    return dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

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

export const destroy = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/bookings/${id}`);

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
