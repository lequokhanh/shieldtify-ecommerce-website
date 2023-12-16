import { createContext, useEffect, useState } from 'react';
import { getUser } from '../utils/api';

export const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    currentUser: null,
    setCurrentUser: () => {}
});

const getInitialLogInState = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn ? JSON.parse(isLoggedIn) : false 
}

const getInitialUserState = () => {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null
}

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(getInitialLogInState);
    const [currentUser, setCurrentUser] = useState(getInitialUserState);
    const value = {
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser
    }

    useEffect( () => {
        const intervalId = setInterval(() => {
            getUser().catch(() => {
                setIsLoggedIn(false);
            }); 
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect (() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn))
        if(isLoggedIn===true){
            getUser().then((res) => {
                if(res.data.data.role === "staff" || res.data.data.role === "superadmin" || res.data.data.role === "admin"){   
                    setCurrentUser(res.data.data);
                    localStorage.setItem("currentUser", JSON.stringify(res.data.data));
                }else{
                    setIsLoggedIn(false);
                }
            }).catch(() => {
                setIsLoggedIn(false);
            })
        }else {
            localStorage.setItem("currentUser",null);
        }       
    }, [isLoggedIn]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
