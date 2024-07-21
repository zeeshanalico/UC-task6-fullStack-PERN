import { toast } from 'react-toastify';
import axios from 'axios'
export const server_url = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


const login = async (email, password) => {
    if (!email || !password) {
        return;
    }
    try {
        const response = await server_url.post('/login');
        return response.data;
    } catch (error) {
        console.error('Error fetching Items:', error);
    }
}

const signup = async (username, email, password, cnfPassword) => {
    if (!username.trim() || !password.trim() || !cnfPassword.trim() || !email.trim()) {
        toast.warning('Please fill all the fields!')
        return;
    }
    if (cnfPassword !== password) {
        toast.warning('Password should be same!')
        return;//toast
    }
    try {
        const response = await server_url.post(`/signup`, { username, email, password }, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.error('Error creating Item:', error);
        toast.error('Error Sending request');
    }
}

export default { signup, login };