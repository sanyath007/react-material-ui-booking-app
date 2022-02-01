import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    patient: {},
    patients: [],
    pager: null,
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.patients = action.payload.items;
      state.pager = action.payload.pager;
    },
  }
});

export default patientSlice.reducer;

// Actions
const { fetchAllSuccess } = patientSlice.actions;

export const fetchPatientAll = () => async (dispatch) => {
  try {
    const res = await api.get('/patients');

    return dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
