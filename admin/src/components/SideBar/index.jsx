import { 
    Flex, 
    VStack,
    Image,
    Text
} from "@chakra-ui/react";
import { manageCategories } from "../../data";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import * as router from 'react-router-dom'
import { AuthContext } from "../../context/auth.context";

const SideBar = () => {
    const [ activeCategory, setActiveCategory ] = useState("Dashboard");
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    const path = location.pathname;
    const category = path.split("/")[2];
    useEffect(() => {
        setActiveCategory(category);
        if(!category){
            setActiveCategory("Dashboard");
        }
    }, [category]);

    const filteredCategories = (currentUser) && currentUser.role === "staff" ? 
        manageCategories.filter(category => 
            category.name === "Orders" || category.name === "Products" || category.name === "Dashboard"
        ) : 
        manageCategories;

    return(
    <Flex 
    w="258px" 
    minH="100vh"  
    fontFamily="Inter" 
    bgColor="#FAFAFB"
    boxShadow="0px 2px 5px 0px rgba(23, 26, 31 , 0.09), 0px 0px 2px 0px rgba(23, 26, 31, 0.12)"
    >
        <VStack padding="24px 17px 0px 31px" alignItems="flex-start" h="100vh" >
            {
                filteredCategories.map((category) => (
                    <Flex 
                    key={category.id} 
                    as={router.Link}
                    to={category.match}
                    w="200px"
                    padding="12px 69px 12px 16px" 
                    _hover={{cursor:"pointer"}} 
                    alignItems="center"
                    gap="10px"
                    style={activeCategory === category.match ?
                        {
                            backgroundColor: "#444444",
                            borderRadius: "8px"
                        } 
                        :
                        {
                            backgroundColor: "transparent"
                        }
                    } 
                    >
                        <Image src={category.icon} alt="dashboard" w="32px" h="32px" 
                            style={
                                activeCategory === category.match ?
                                {
                                    filter: "brightness(0) invert(1)"
                                } :
                                {
                                    filter: "none"
                                }
                            }                         
                        />
                        <Text color="#565D6D" 
                        style={
                            activeCategory === category.match ?
                            {
                                color: "#FFFFFF",
                                fontWeight: "700"
                            } :
                            {
                                color: "#565D6D"
                            }
                        } 
                        fontSize="1.125rem" 
                        fontWeight="400">
                            {category.name}
                        </Text>                        
                    </Flex>
                ))
            }       
        </VStack>
    </Flex>
    )
};

export default SideBar;