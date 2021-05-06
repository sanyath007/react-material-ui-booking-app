import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import { fetchRoomsStatus } from '../room/roomSlice';

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    booking: {},
    bookings: [],
    pager: null,
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
    storeSuccess: (state, action) => {
      state.bookings = [...state.bookings, action.payload];
    },
    updateSuccess: (state, action) => {
      const { id, booking: updatedBooking } = action.payload;

      const newBookings = state.bookings.map((booking) => {
        if (booking.book_id === id) {
          return updatedBooking;
        }

        return booking;
      });

      state.bookings = [...newBookings];
    },
    destroySuccess: (state, action) => {
      const newBookings = state.bookings.filter((booking) => booking.book_id !== action.payload);

      state.bookings = [...newBookings];
    },
    cancelSuccess: (state, action) => {
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
    }
  }
});

export default bookingSlice.reducer;

// Actions
const {
  fetchAllSuccess,
  fetchBookingฺByIdSuccess,
  fetchBookingฺByAnSuccess,
  storeSuccess,
  updateSuccess,
  destroySuccess,
  cancelSuccess,
  checkinSuccess,
  checkoutSuccess,
} = bookingSlice.actions;

export const fetchBookingAll = () => async (dispatch) => {
  try {
    const res = await api.get('/bookings');

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

export const store = (data, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/bookings', data);
    console.log(res);

    dispatch(storeSuccess(res.data.booking));

    navigate('/app/bookings');
  } catch (error) {
    console.log(error);
  }
};

export const update = (id, data, navigate) => async (dispatch) => {
  try {
    const res = await api.put(`/bookings/${id}`, data);

    dispatch(updateSuccess({ id, booking: res.data.booking }));

    navigate('/app/bookings');
  } catch (error) {
    console.log(error);
  }
};

export const destroy = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/bookings/${id}`);
    console.log(res);

    dispatch(destroySuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const cancel = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/bookings/cancel/${id}`);
    console.log(res);

    dispatch(cancelSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const checkin = (data) => async (dispatch) => {
  try {
    const res = await api.post('/bookings/checkin', data);
    console.log(res);

    dispatch(checkinSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const checkout = (bookId, roomId) => async (dispatch) => {
  try {
    const res = await api.put(`/bookings/checkout/${bookId}/${roomId}`);
    console.log(res);

    dispatch(checkoutSuccess(res.data));
    dispatch(fetchRoomsStatus());
  } catch (error) {
    console.log(error);
  }
};
