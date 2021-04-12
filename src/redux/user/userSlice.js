import { createSlice } from '@reduxjs/toolkit';
import jwt from 'jwt-decode';
import api from '../../api';

const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

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
  },
});

export default userSlice.reducer;

// Actions
const { loginSuccess, logoutSucces } = userSlice.actions;

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
