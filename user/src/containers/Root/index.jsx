import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";

const Root = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/home");
        }
    }, [location, navigate]);

    return (
        <VStack overflow="hidden" >
            <NavBar/>
            <Outlet/>
            <Footer/>
        </VStack>
    );
};

export default Root;