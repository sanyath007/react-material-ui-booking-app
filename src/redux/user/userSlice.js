import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [],
    pager: {},
  },
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.users = action.payload.users;
      state.pager = action.payload.pager;
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
} = userSlice.actions;

export const fetchAll = () => async (dispatch) => {
  try {
    const res = await api.get('/api/users');

    dispatch(fetchAllSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchById = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/api/users/${username}`);

    dispatch(fetchByIdSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
