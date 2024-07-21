import React, { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate, Link} from "react-router-dom";

const server_url = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser(prevState => { return { ...prevState, [name]: value } })

    }

    //LOGIN HANDLER
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = user;
            const response = await server_url.post(`/login`, { email, password });
            if (response.data.success) {
                const { message, result: { token, user: { role_id, role } }, success } = response.data;
                toast.success(message)
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                //decode token
                navigate("/dashboard", { replace: true });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error sending request');
            console.log(error);
        }
    }

    return (

        <form onSubmit={submitHandler} className="w-50 m-auto mt-5 p-4 border rounded bg-light shadow">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label text-primary">Email address</label>
                <input type="email" name="email" value={user.email} className="form-control border-primary" onChange={changeHandler} />
                <div id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label text-primary">Password</label>
                <input type="password" name="password" value={user.password} minLength="6" className="form-control border-primary" onChange={changeHandler} />
            </div>
            <div className="d-flex flex-row align-content-center">
                <span>
                    Don't have account yet? &ensp;
                </span>
                <Link to='/signup' >signup</Link>
            </div>
            <br />
            <button type="submit" className="btn btn-primary btn-lg w-100">Login</button>
        </form>
    )
}

export default Login