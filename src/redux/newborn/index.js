import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { responsedErrorHandler } from 'src/utils';
import axios from 'axios';
import api from '../../api';

// Actions
export const fetchAll = createAsyncThunk('newborn/fetchAll', async ({ params = '' }) => {
  try {
    const res = await api.get(`/newborns${params}`);

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

export const fetchAllWithPage = createAsyncThunk('newborn/fetchAll', async ({ url }) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

export const fetchIpByAn = createAsyncThunk('newborn/fetchByAn', async ({ an = '' }) => {
  try {
    const res = await api.get(`/newborns/${an}`);

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

export const newbornSlice = createSlice({
  name: 'newborn',
  initialState: {
    newborn: {},
    newborns: [],
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
      state.newborns = action.payload.items;
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
      state.newborn = action.payload;
      state.loading = false;
      state.error = '';
    },
    [fetchIpByAn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  }
});

export default newbornSlice.reducer;
