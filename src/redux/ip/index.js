import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { responsedErrorHandler } from 'src/utils';
import axios from 'axios';
import api from '../../api';

// Actions
export const fetchAll = createAsyncThunk('ip/fetchAll', async ({ qs = '' }) => {
  try {
    const res = await api.get(`/ips${qs}`);

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

export const fetchAllWithPage = createAsyncThunk('ip/fetchAll', async ({ url }) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

export const fetchIpByAn = createAsyncThunk('ip/fetchByAn', async ({ an = '' }) => {
  try {
    const res = await api.get(`/ips/${an}`);

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

// TODO: add CRUD action of room

export const ipSlice = createSlice({
  name: 'ip',
  initialState: {
    ip: {},
    ips: [],
    pager: null,
    loading: false,
    error: ''
  },
  reducers: {},
  extraReducers: {
    [fetchAll.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchAll.fulfilled]: (state, action) => {
      state.ips = action.payload.items;
      state.pager = action.payload.pager;
      state.loading = false;
      state.error = '';
    },
    [fetchAll.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchIpByAn.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchIpByAn.fulfilled]: (state, action) => {
      state.ip = action.payload;
      state.loading = false;
      state.error = '';
    },
    [fetchIpByAn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  }
});

export default ipSlice.reducer;
