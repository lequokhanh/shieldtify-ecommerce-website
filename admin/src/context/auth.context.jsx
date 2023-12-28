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

// const getInitialUserState = () => {
//     // const currentUser = localStorage.getItem("currentUser");
//     return currentUser ? JSON.parse(currentUser) : null
// }

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(getInitialLogInState);
    const [currentUser, setCurrentUser] = useState(null);
    const value = {
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser
    }

    useEffect( () => {
        const intervalId = setInterval(() => {
            if(isLoggedIn){
                getUser().catch(() => {
                    setIsLoggedIn(false);
                }); 
            }
        }, 10000);
        return () => clearInterval(intervalId);
    }, [isLoggedIn]);
    useEffect (() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn))
        if(isLoggedIn===true){
            getUser().then((res) => {
                if(res.data.data.role === "staff" || res.data.data.role === "superadmin" || res.data.data.role === "admin"){   
                    setCurrentUser(res.data.data);
                }else{
                    setIsLoggedIn(false);
                }
            }).catch(() => {
                setIsLoggedIn(false);
            })
        }else {
            setCurrentUser(null);
        }       
    }, [isLoggedIn]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
