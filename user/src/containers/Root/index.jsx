import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";


const Root = () => {
    return(
        <Box w="full">
            <NavBar/>
            <Outlet/>
            <Footer/>
        </Box>
    )
}

export default Root;