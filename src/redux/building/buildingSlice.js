import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const buildingSlice = createSlice({
  name: 'building',
  initialState: {
    building: {},
    buildings: []
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.buildings = action.payload;
    }
  }
});

export default buildingSlice.reducer;

// Actions
const { fetchAllSuccess } = buildingSlice.actions;

export const fetchBuildingAll = () => async (dispatch) => {
  try {
    const res = await api.get('/buildings');

    return dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
