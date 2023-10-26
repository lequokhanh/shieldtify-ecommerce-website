import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
import { VStack } from "@chakra-ui/react";


const Root = () => {
    return (
        <VStack >
            <NavBar/>
            <Outlet/>
        </VStack>
    )
}

export default Root;