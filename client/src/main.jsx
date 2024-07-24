// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Dashboard from './components/Dashboard.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Unauthorized from './components/Unauthorized.jsx';
const Dashboard = React.lazy(() => import('./components/Dashboard.jsx'));
import Missing from './components/Missing.jsx';

import { Provider } from 'react-redux';
import store from './store/store.js';
import { useSelector } from 'react-redux';

const AppRoutes = () => {
  console.log('render  main/approuter');
  const { isAuthenticated, role, loading } = useSelector((state) => state.auth);//async

  console.log(loading, isAuthenticated, role);


  return (
    <React.Suspense fallback={<div>loading ...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected Route */}
        <Route path="dashboard" element={isAuthenticated && role ? <Dashboard role={role} /> : <Navigate to="/" />} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </React.Suspense>
  );
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
