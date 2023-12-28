import NavBar from "../../Components/NavBar";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Root = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/") {
			navigate("/manage/dashboard");
		}
	}, [location, navigate]);

	return (
		<Flex flexDir="column" overflow="hidden">
			<NavBar />
			<Outlet />
		</Flex>
	);
};

export default Root;
