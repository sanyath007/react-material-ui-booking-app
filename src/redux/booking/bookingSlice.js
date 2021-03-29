import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    booking: {},
    bookings: [],
    pager: null,
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.bookings = action.payload;
    },
    addSuccess: (state, action) => {
      state.bookings = [...state.bookings, action.payload];
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
  addSuccess,
  checkinSuccess,
  checkoutSuccess,
} = bookingSlice.actions;

export const fetchBookingAll = () => async (dispatch) => {
  try {
    const res = await api.get('/bookings');

    return dispatch(fetchAllSuccess(res.data.items));
  } catch (error) {
    console.log(error);
  }
};

export const addBooking = (data) => async (dispatch) => {
  try {
    const res = await api.post('/bookings', data);
    console.log(res);

    dispatch(addSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of booking

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
  } catch (error) {
    console.log(error);
  }
};
