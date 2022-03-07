import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';

const initialState = {
  patient: null,
  patients: [],
  pager: null,
  loading: false,
  error: ''
};

export const fetchPatients = createAsyncThunk('patient/fetchAll', async ({ qs }) => {
  try {
    const res = await api.get(`/patients${qs}`);

    return res.data;
  } catch (error) {
    return error;
  }
});

export const fetchPatientsWithPage = createAsyncThunk('patient/fecthAllWithPage', async ({ url }) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    return error;
  }
});

export const getPatient = (state, hn) => {
  return state.patient.patients.find((patient) => patient.hn === hn);
};
// TODO: add CRUD action of room

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPatients.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchPatients.fulfilled]: (state, action) => {
      const { items, pager } = action.payload;

      state.patients = items;
      state.pager = pager;
      state.loading = false;
      state.error = '';
    },
    [fetchPatients.rejected]: (state, action) => {
      state.patients = [];
      state.pager = null;
      state.loading = false;
      state.error = action.error.message;
    },
    [fetchPatientsWithPage.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchPatientsWithPage.fulfilled]: (state, action) => {
      const { items, pager } = action.payload;

      state.patients = items;
      state.pager = pager;
      state.loading = false;
      state.error = '';
    },
    [fetchPatientsWithPage.rejected]: (state, action) => {
      state.patients = [];
      state.pager = null;
      state.loading = false;
      state.error = action.error.message;
    }
  }
});

export default patientSlice.reducer;
