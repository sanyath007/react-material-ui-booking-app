import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorHandler from 'src/utils/responseErrorHandler';
import api from '../../api';

// Actions
export const fetchAll = createAsyncThunk('roomGroup/fetchAll', async () => {
  try {
    const res = await api.get('/room-groups');

    return res.data;
  } catch (error) {
    errorHandler(error);
  }
});

// TODO: add CRUD action of room

export const roomGroupSlice = createSlice({
  name: 'roomGroup',
  initialState: {
    roomGroups: [],
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
      state.roomGroups = action.payload;
      state.loading = false;
    },
    [fetchAll.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

export default roomGroupSlice.reducer;
