import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const server_url = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

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
            console.error(error);//unexpected error must be logged
            return rejectWithValue(error.message || 'Something went wrong!');
        }
    }
);