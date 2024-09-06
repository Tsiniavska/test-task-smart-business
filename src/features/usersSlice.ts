// * Base
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

type Filters = {
  name: string;
  username: string;
  email: string;
  phone: string;
};

type UsersState = {
  users: User[];
  filteredUsers: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: Filters;
};

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  status: 'idle',
  error: null,
  filters: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ field: keyof Filters; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.filters[field] = value;
      state.filteredUsers = state.users.filter((user) =>
        user[field].toLowerCase().includes(value.toLowerCase())
      );
    },
    resetFilters: (state) => {
      state.filters = {
        name: '',
        username: '',
        email: '',
        phone: '',
      };
      state.filteredUsers = state.users;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setFilter, resetFilters } = usersSlice.actions;
export default usersSlice.reducer;
