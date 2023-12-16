import NavBar from "../../Components/NavBar";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

const Root = () => {
    return (
        <Flex flexDir="column" overflow="hidden" >
            <NavBar/>
            <Outlet/>
        </Flex>
    );
}

export default Root;