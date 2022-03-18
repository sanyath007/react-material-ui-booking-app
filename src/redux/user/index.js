import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { responsedErrorHandler } from 'src/utils';
import api from '../../api';

// Actions
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const res = await api.get('/api/users');

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

export const fetchUser = createAsyncThunk('user/fetchUser', async ({ username }) => {
  try {
    const res = await api.get(`/api/users/${username}`);

    return res.data;
  } catch (error) {
    responsedErrorHandler(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [],
    pager: null,
    loading: false,
    error: ''
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload.users;
      state.pager = action.payload.pager;
      state.loading = false;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchUser.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [fetchUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  }
});

export default userSlice.reducer;
