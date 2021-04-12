import { createSlice } from '@reduxjs/toolkit';
import jwt from 'jwt-decode';
import api from '../../api';

const initialUser = localStorage.getItem('access_token')
  ? jwt(JSON.parse(localStorage.getItem('access_token'))?.token)?.sub
  : null;

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser
  },
  reducers: {
    loginSuccess: (state, action) => {
      const decoded = jwt(action.payload.token);

      state.user = decoded.sub;
      localStorage.setItem('access_token', JSON.stringify(action.payload));
    },
    logoutSucces: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    fetchAllSuccess: (state, action) => {
      state.user = action.payload;
    },
    fetchByIdSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

// Actions
const {
  fetchAllSuccess,
  fetchByIdSuccess,
  loginSuccess,
  logoutSucces
} = userSlice.actions;

export const fetchAll = () => async (dispatch) => {
  try {
    const res = await api.get('/users');

    dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchById = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/users/${username}`);

    dispatch(fetchByIdSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const login = (username, password, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/login', { username, password });

    dispatch(loginSuccess(res.data));

    navigate('/app/dashboard', { replace: true });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutSucces());
  } catch (error) {
    console.log(error);
  }
};
