import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorHandler from 'src/utils/responseErrorHandler';
import api from '../../api';

export const fetchAll = createAsyncThunk('specialist/fetchAll', async ({ queryParams }) => {
  try {
    const res = await api.get(`/specialists${queryParams}`);

    return res.data;
  } catch (err) {
    errorHandler(err);
  }
});

export const specialistSlice = createSlice({
  name: 'specialist',
  initialState: {
    specialists: [],
    pager: null,
    loading: false,
    error: ''
  },
  extraReducers: {
    [fetchAll.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.specialists = action.payload;
    },
    [fetchAll.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

export default specialistSlice.reducer;
