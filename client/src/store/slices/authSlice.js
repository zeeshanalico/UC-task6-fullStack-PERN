import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const server_url = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

// Async thunk for login
export const loginAsync = createAsyncThunk(
    'auth/loginAsync',
    async ({ email, password }, { rejectWithValue }) => {//rejectedWithValue always goes to .rejected case 
        if (!email || !password) {
            return;
        }
        try {
            const response = await server_url.post('/login', { email, password });
            const { success, result, message } = response.data;
            if (success) {
                return result;
            } else {
                return rejectWithValue(message);
            }
        } catch (error) {            
            return rejectWithValue(error.message || 'Something went wrong!');
        }
    }
);

const initialState = {
    isAuthenticated: Boolean(localStorage.getItem('token')),//false/true
    role: localStorage.getItem('role'),
    user: null,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.role = null;
            localStorage.clear()
        },
    },
    extraReducers: (builder) => {
        builder //pending + rejected | pending + fullfill 
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                const { token, user } = action.payload;
                localStorage.setItem('token', token);
                localStorage.setItem('role', user.role || 'user');//change here
                state.role = user.role;
                state.user = user;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed.';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
