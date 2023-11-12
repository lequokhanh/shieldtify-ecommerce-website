import { createContext, useEffect, useState } from 'react';
import { getUser } from '../utils/api';

export const AuthContext = createContext();

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            getUser().catch(e => {
                if(e){
                    setIsLoggedIn(false);
                }
            }); 
        }, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect (() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn))
        if(isLoggedIn===true){
            getUser().then((res) => {
                setCurrentUser(res.data.data);
                localStorage.setItem("currentUser", JSON.stringify(res.data.data))
            })
        }else {
            localStorage.setItem("currentUser",null);
        }       
    }, [isLoggedIn]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
