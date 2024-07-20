import React, { useState } from "react"

const SignUp = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '', cnfPassword: '' })
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser(prevState => { return { ...prevState, [name]: value } })
    }

    const submitHandler = (e) => {
        const { username, email, password, cnfPassword } = user;
        if (!username || !password || !cnfPassword || email)
            return;
            if (cnfPassword !== password) {
                return;
            }
        e.preventDefault()
        console.log(user);

    }
    return (

        <form onSubmit={submitHandler} className="w-50 m-auto mt-5" >
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" name="username" className="form-control" onChange={changeHandler} />
            </div>
            <div className="mb-3 ">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" onChange={changeHandler} />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" minLength={'6'} className="form-control" autoComplete={"false"} onChange={changeHandler} />
            </div>
            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" name="cnfPassword" minLength={'6'} className="form-control" autoComplete={'false'} onChange={changeHandler} />
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
        </form>
    )
}

export default SignUp