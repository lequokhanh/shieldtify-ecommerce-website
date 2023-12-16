import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { isLoggedIn, currentUser } = useContext(AuthContext);
    return (isLoggedIn) 
    && (currentUser && currentUser.role) 
    && (currentUser.role ==="staff" || currentUser.role === "superadmin" || currentUser.role === "admin")  ? children : <Navigate to="/sign-in" />;
}

function DenyManageRoute({ children }) {
    const {currentUser} = useContext(AuthContext);
    return ((currentUser) && currentUser.role == "staff") ? <Navigate to="/manage/dashboard" /> : children;
}

export { PrivateRoute, DenyManageRoute};