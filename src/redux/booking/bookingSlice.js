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
    }
  }
});

export default bookingSlice.reducer;

// Actions
const { fetchAllSuccess, addSuccess } = bookingSlice.actions;

export const fetchBookingAll = () => async (dispatch) => {
  try {
    const res = await api.get('/bookings');
    console.log(res);
    return dispatch(fetchAllSuccess(res.data.items));
  } catch (error) {
    console.log(error);
  }
};

export const addBooking = (data) => async (dispatch) => {
  try {
    const res = await api.post('/bookings', data, {
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

// TODO: add CRUD action of booking
