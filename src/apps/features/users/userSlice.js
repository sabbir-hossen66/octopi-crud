import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const API_BASE_URL = 'https://wesoftin-backend.vercel.app/users';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch(`${API_BASE_URL}`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
});


export const fetchUser = createAsyncThunk('users/fetchUser', async (userId) => {
  const response = await fetch(`${API_BASE_URL}/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return await response.json();
});


export const createUser = createAsyncThunk('users/createUser', async (newUser) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return await response.json();
});


export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, updatedData }) => {
  const response = await fetch(`${API_BASE_URL}/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return await response.json();
});


export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  const response = await fetch(`${API_BASE_URL}/${userId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete user');
  return userId; // Return ID for deletion in state
});


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;