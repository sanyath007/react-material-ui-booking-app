import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { responsedErrorHandler } from 'src/utils';
import jwt from 'jwt-decode';
import api from '../../api';

const initialAuth = localStorage.getItem('access_token')
  ? jwt(JSON.parse(localStorage.getItem('access_token')))?.sub
  : null;

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  try {
    const res = await api.post('/login', { username, password });

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: initialAuth,
    loading: false,
    error: ''
  },
  reducers: {
    logout: (state) => {
      state.auth = null;
      localStorage.removeItem('access_token');
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [login.fulfilled]: (state, action) => {
      if (action.payload) {
        const decoded = jwt(action.payload);

        state.auth = decoded.sub;
        localStorage.setItem('access_token', JSON.stringify(action.payload));
      }

      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  }
});

export default authSlice.reducer;

const { logout } = authSlice.actions;

export const tryLogout = (navigate) => async (dispatch) => {
  try {
    dispatch(logout());

    navigate('../login', { replace: true });
  } catch (error) {
    console.log(error);
  }
};
