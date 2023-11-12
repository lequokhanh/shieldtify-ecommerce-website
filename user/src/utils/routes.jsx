import Root from "../containers/Root"; 
import SignUp from "../containers/SignUp";
import RegisterComplete from "../containers/RegisterComplete";
import SignIn from "../containers/SignIn";
import ResetPassword from "../containers/ResetPassword";
import NotFound from "../components/NotFound";
import ResetPasswordComplete from "../containers/ResetPasswordComplete";
import Home from "../containers/Home";

const routes = [
    {
        path:  '/',
        element: <Root/>,
        children: [
            {
                path: '/home', // This makes it the default route for the root path
                element: <Home/>,
                name: "home",
            },
            {  
                path: '/sign-up',
                element: <SignUp/>,
                name: "sign-up"
            },
            {
                path: '/sign-in',
                element: <SignIn/>,
                name: "sign-in"
            },
            {
                path: '/register-complete',
                element: <RegisterComplete/>,
                name: "register-complete",
            },
            {
                path: '/reset-password',
                element: <ResetPassword/>,
                name: "reset-password"
            },
            {
                path: '/reset-password-complete',
                element: <ResetPasswordComplete/>,
                name: "reset-password-complete"
            }
            ,
            {
                path: '*',
                element: <NotFound/>,
                name: "not-found"
            }
        ]
    },
];

export default routes;