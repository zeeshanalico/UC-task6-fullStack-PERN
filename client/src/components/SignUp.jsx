import React, { useState } from "react"
import { Link } from 'react-router-dom'
import authApi from '../api/authApi.js'

const SignUp = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '', cnfPassword: '' })

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser(prevState => { return { ...prevState, [name]: value } })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const { username, email, password, cnfPassword } = user;
        const data = await authApi.signup(username, email, password, cnfPassword);
        if (data.success) {
            setUser({ username: '', email: '', password: '', cnfPassword: '' })
        }
    }

    return (
        <form onSubmit={submitHandler} className="w-50 m-auto mt-5 p-4 border rounded bg-light shadow" >
            <div className="mb-3">
                <label className="form-label text-primary">Username</label>
                <input type="text" name="username" value={user.username} className="form-control border-primary" onChange={changeHandler} />
            </div>
            <div className="mb-3 ">
                <label htmlFor="exampleInputEmail1" className="form-label text-primary">Email address</label>
                <input type="email" name="email" value={user.email} className="form-control border-primary" onChange={changeHandler} />
            </div>
            <div className="mb-3">
                <label className="form-label text-primary">Password</label>
                <input type="password" name="password" value={user.password} minLength={'6'} className="form-control border-primary" autoComplete={"false"} onChange={changeHandler} />
            </div>
            <div className="mb-1">
                <label className="form-label text-primary">Confirm Password</label>
                <input type="password" name="cnfPassword" value={user.cnfPassword} minLength={'6'} className="form-control border-primary" autoComplete={'false'} onChange={changeHandler} />
            </div>
            <div className="d-flex flex-row align-content-center">
                <span>
                    already registered? &ensp;
                </span>
                <Link to='/' >Login</Link>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Signup</button>
        </form>
    )
}

export default SignUp