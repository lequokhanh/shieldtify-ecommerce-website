import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { getUser } from "./api";
import { useEffect } from "react";


function PrivateRoute({ children }) {
    const { isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
    const [result, setResult] = useState(null);

    useEffect(() => {
        getUser().then((res) => {
            if(res.data.data.role === "staff" || res.data.data.role === "superadmin" || res.data.data.role === "admin"){   
                setCurrentUser(res.data.data);
                setResult(children);
            }else{
                setIsLoggedIn(false);
                setResult(<Navigate to="/sign-in" />);
            }
        }).catch(() => {
            setIsLoggedIn(false);
            setResult(<Navigate to="/sign-in" />);

        })
    }, [children, setCurrentUser, setIsLoggedIn]);

    return result;
}

function DenyManageRoute({ children }) {
    const {currentUser} = useContext(AuthContext);
    return ((currentUser) && currentUser.role == "staff") ? <Navigate to="/manage/dashboard" /> : children;
}

// function DenySignIn({children}){
//     const {isLoggedIn} = useContext(AuthContext);
//     return (isLoggedIn) ? <Navigate to="/manage/dashboard" /> : children;
// }

export { PrivateRoute, DenyManageRoute };