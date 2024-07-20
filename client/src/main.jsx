import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './components/Dashboard.jsx'
import SignUp from './components/SignUp.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

const routes = [
  {
    path: "/",
    element: <AuthProvider> <Dashboard /> </AuthProvider>
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: '*',
    element: <div>Page Not Found</div>
  }
]

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,

)
