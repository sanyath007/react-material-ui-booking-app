import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const ipSlice = createSlice({
  name: 'ip',
  initialState: {
    ip: {},
    ips: []
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.ips = action.payload;
    },
  }
});

export default ipSlice.reducer;

// Actions
const { fetchAllSuccess } = ipSlice.actions;

export const fetchIpAll = () => async (dispatch) => {
  try {
    const res = await api.get('/ips');
    console.log(res);
    return dispatch(fetchAllSuccess(res.data.items));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
