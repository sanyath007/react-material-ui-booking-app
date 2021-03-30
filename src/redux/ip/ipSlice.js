import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';

export const ipSlice = createSlice({
  name: 'ip',
  initialState: {
    ip: {},
    ips: [],
    pager: null,
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.ips = action.payload.items;
      state.pager = action.payload.pager;
    },
    fetchIpByAnSuccess: (state, action) => {
      state.ip = action.payload;
    },
  }
});

export default ipSlice.reducer;

// Actions
const { fetchAllSuccess, fetchIpByAnSuccess } = ipSlice.actions;

export const fetchIpAll = () => async (dispatch) => {
  try {
    const res = await api.get('/ips');
    console.log(res);
    return dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchIpAllWithPage = (url) => async (dispatch) => {
  try {
    const res = await axios.get(url);

    return dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchIpByAn = (an) => async (dispatch) => {
  try {
    console.log(an);
    const res = await api.get(`/ips/${an}`);
    console.log(res);

    return dispatch(fetchIpByAnSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
