import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { responsedErrorHandler } from 'src/utils';
import api from '../../api';

// Actions
export const fetchAll = createAsyncThunk('building/fetchAll', async ({ params }) => {
  try {
    const res = await api.get(`/buildings${params}`);

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

// TODO: add CRUD action of room

export const buildingSlice = createSlice({
  name: 'building',
  initialState: {
    buildings: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [fetchAll.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.buildings = action.payload;
    },
    [fetchAll.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

export default buildingSlice.reducer;
