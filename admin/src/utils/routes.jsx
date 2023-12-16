import Root from "../containers/Root";
import SignIn from "../containers/SignIn";
import Manage from "../containers/Manage";
import DashBoard from "../containers/Dashboard";
import Products from "../containers/Products";
import Forums from "../containers/Forums";
import Orders from "../containers/Orders";
import Promotions from "../containers/Promotions";
import Users from "../containers/Users";
import EditProducts from "../containers/EditProducts";
import NotFound from "../components/NotFound";
import {
    PrivateRoute,
    DenyManageRoute
} from './accessControl';
import EditUsers from "../containers/EditUsers";

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/sign-in',
                element: <SignIn />,
                name: 'sign-up',
            },
            {
                path: '/manage',
                element: <PrivateRoute><Manage /></PrivateRoute>,
                children: [
                    {
                        path: '/manage/dashboard',
                        element: <DashBoard/>,
                        name: 'dashboard',
                    },
                    {
                        path: '/manage/products',
                        element: <Products/>,
                        name: 'products',
                    },
                    {
                        path: '/manage/products/edit/:id',
                        element: <EditProducts/>,
                        name: 'edit-products',
                    },
                    {
                        path: '/manage/forums',
                        element: <DenyManageRoute><Forums/></DenyManageRoute>,
                        name: 'forum',
                    },
                    {
                        path: '/manageOrders',
                        element: <Orders/>,
                        name: 'orders',
                    },
                    {
                        path: '/manage/promotions',
                        element: <DenyManageRoute><Promotions/></DenyManageRoute>,
                        name: 'promotions',
                    },
                    {
                        path: '/manage/users',
                        element: <DenyManageRoute><Users/></DenyManageRoute>,
                        name: 'users',
                    },
                    {
                        path: '/manage/users/edit/:id',
                        element: <DenyManageRoute><EditUsers/></DenyManageRoute>,
                        name: 'edit-users',
                    }
                ]
            },            
            {
                path: '*',
                element: <NotFound/>,
                name: 'not-found',
            }
        ]
    }
];

export default routes;