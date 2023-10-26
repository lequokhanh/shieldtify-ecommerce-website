import Root from "../containers/Root"; 
import SignUp from "../containers/SignUp";
import RegisterComplete from "../containers/RegisterComplete";

const routes = [
    {
        path:  '/',
        element: <Root/>,
        children: [
            {
                path: '/sign-up',
                element: <SignUp/>,
                name: "sign-up"
            },
            {
                path: '/register-complete',
                element: <RegisterComplete />,
                name: "register-complete",
            }
        ]
    }
];

export default routes;