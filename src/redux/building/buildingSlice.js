import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const buildingSlice = createSlice({
  name: 'room',
  initialState: {
    building: {},
    buildings: []
  },
  reducers: {
    fetchBuildingAllSuccess: (state, action) => {
      state.buildings = action.payload;
    }
  }
});

export default buildingSlice.reducer;

// Actions
const { fetchBuildingAllSuccess } = buildingSlice.actions;

export const fetchBuildingAll = () => async (dispatch) => {
  try {
    const res = await api.get('/buildings');

    return dispatch(fetchBuildingAllSuccess(res.data.items));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
