import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";


const Root = () => {
    return(
        <Box w="full">
            <NavBar/>
            <Outlet/>
        </Box>
    )
}

export default Root;