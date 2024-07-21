import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const matchedRole = allowedRoles.find(role => role.role === localStorage.getItem('role'));
    return (
        matchedRole
            ? <Outlet context={{ role: matchedRole }} />
            : localStorage.getItem('token')
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
