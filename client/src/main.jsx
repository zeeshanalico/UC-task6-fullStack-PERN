import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from './components/Dashboard.jsx'
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx'
import RequireAuth from './context/RequiredAuth.jsx';

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Unauthorized from './components/Unauthorized.jsx'
import Missing from './components/Missing.jsx'

const ROLES = [
  {
    role_id: 1,
    role: "ADMIN",
  },
  {
    role_id: 2,
    role: "EDITOR",
  },
  {
    role_id: 3,
    role: "CREATOR",
  },
]

// const routes = [
//   {
//     path: "/",
//     element: <AuthProvider> <Dashboard /> </AuthProvider>
//   },
//   {
//     path: "/signup",
//     element: <SignUp />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: '*',
//     element: <div>Page Not Found</div>
//   }
// ]
{/* <RouterProvider router={router} /> */ }
// const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
        <Routes>

          <Route path="/">
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Missing />} />
          </Route>

          <Route path="/" element={<RequireAuth allowedRoles={ROLES} />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          
        </Routes>
        <ToastContainer />
    </BrowserRouter>

  </React.StrictMode>,

)
