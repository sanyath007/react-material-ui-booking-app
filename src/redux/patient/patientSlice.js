import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    patient: {},
    patients: []
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.patients = action.payload;
    },
  }
});

export default patientSlice.reducer;

// Actions
const { fetchAllSuccess } = patientSlice.actions;

export const fetchPatientAll = () => async (dispatch) => {
  try {
    const res = await api.get('/patients');

    return dispatch(fetchAllSuccess(res.data.items));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
