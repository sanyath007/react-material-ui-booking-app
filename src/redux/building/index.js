import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorHandler from 'src/utils/responseErrorHandler';
import api from '../../api';

// Actions
export const fetchBuildings = createAsyncThunk('building/fetchBuildings', async ({ params = '' }) => {
  try {
    const res = await api.get(`/buildings${params}`);

    return res.data;
  } catch (error) {
    errorHandler(error);
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
    [fetchBuildings.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchBuildings.fulfilled]: (state, action) => {
      state.loading = false;
      state.buildings = action.payload;
    },
    [fetchBuildings.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

export default buildingSlice.reducer;
