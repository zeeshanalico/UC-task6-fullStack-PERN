import React, { useState } from "react"
import { useAuth } from "../context/AuthContext"

const SignUp = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const changeHandler = () => {

    }

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(user);
    }
    
    return (

        <form onSubmit={submitHandler} className="w-50 m-auto mt-auto" >
            <div className="mb-3 ">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" onChange={changeHandler} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" minLength={'6'} className="form-control" onChange={changeHandler} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    )
}

export default SignUp