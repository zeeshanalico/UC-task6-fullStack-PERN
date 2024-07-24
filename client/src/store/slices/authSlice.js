import { createSlice } from '@reduxjs/toolkit';
import { ROLES } from '../roles.js'
import { loginAsync } from './asyncThunks/loginAsync.js'

const getRoleObj = role => {
    const match = ROLES.find(r => r.roleName === role);
    return match || false;
}

const initialState = {
    isAuthenticated: Boolean(localStorage.getItem('token')),//false/true
    role: getRoleObj(localStorage.getItem('role')),
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
                localStorage.setItem('role', user.role || 'user');
                state.role = getRoleObj(user.role);
                state.user = user;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginAsync.rejected, (state, action) => {//get action from loginasync
                state.loading = false;
                state.error = action.payload || 'Login failed.';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
