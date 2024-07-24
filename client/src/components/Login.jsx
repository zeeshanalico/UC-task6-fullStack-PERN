import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginAsync } from '../store/slices/asyncThunks/loginAsync.js';

const Login = () => {
  console.log('render login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [user, setUser] = React.useState({ email: '', password: '' });
  
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!user.email.trim() || !user.password.trim()) {
      toast.error('Email or password is missing');
      return;
    }
    
    debugger;   
    const resultAction = await dispatch(loginAsync(user));//it will return action

    if (loginAsync.fulfilled.match(resultAction)) {//matching the action of fullfilled with action we did
      toast.success('Login successful');
      navigate('/dashboard', { replace: true });
    } else {
      toast.error(resultAction.payload || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-50 m-auto mt-5 p-4 border rounded bg-light shadow"
    >
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label text-primary">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={user.email}
          className="form-control border-primary"
          onChange={changeHandler}
          disabled={loading}
        />
        <div id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="exampleInputPassword1"
          className="form-label text-primary"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          value={user.password}
          minLength="6"
          className="form-control border-primary"
          onChange={changeHandler}
          disabled={loading}
        />
      </div>
      <div className="d-flex flex-row align-content-center">
        <span>Don't have an account yet? &ensp;</span>
        <Link to="/signup">Signup</Link>
      </div>
      <br />
      <button
        type="submit"
        className="btn btn-primary btn-lg w-100"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
