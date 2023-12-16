import { Flex } from "@chakra-ui/react";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";

const Manage = () => {
    return(
        <Flex>
            <SideBar/>
            <Outlet/>
        </Flex>
    )
}

export default Manage;