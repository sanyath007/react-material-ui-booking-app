import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
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

export const fetchPatientAll = (qs = '') => async (dispatch) => {
  try {
    const res = await api.get(`/patients${qs}`);

    return dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchPatientAllWithPage = (url) => async (dispatch) => {
  try {
    const res = await axios.get(url);

    return dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

// TODO: add CRUD action of room
