import { Button, Menu, MenuButton, MenuList, Image, Flex, Text } from "@chakra-ui/react";
import group from "../../assets/Group.svg"
import user_profile from "../../assets/user-profile.svg"
import order from "../../assets/order.svg"
import { logout } from "../../utils/api";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const UserMenu = () => {

    const { setIsLoggedIn, currentUser } = useContext(AuthContext);
    return (
        <Menu offset={[30,30]}>  
            <MenuButton>
                <Image w="20px" h="30px" src={group}/>
            </MenuButton> 
            <MenuList>
            <Flex gap="30px" flexDir="column"  padding="27px 37px" fontFamily="Inter, sans-serif">
                <Flex>
                    <Text>Hello,&nbsp;</Text>
                    {
                        currentUser ?
                        (                    
                        <Text color="gray">{currentUser.display_name}</Text>
                        ): 
                        null
                    }
                </Flex>  
                <Flex gap="10px">
                    <Image src={user_profile}/>
                    <Text 
                    _hover={{
                        cursor: "pointer",
                        textDecorationLine: "underline"
                    }}
                    >Manage profile
                    </Text>
                </Flex>
                <Flex gap="10px">
                    <Image src={order}/>
                    <Text
                    _hover={{
                        cursor: "pointer",
                        textDecorationLine: "underline"
                    }}                    
                    >Track order</Text>
                </Flex>
                <Button 
                colorScheme="blackAlpha"
                bgColor="#2D2D2D"
                color="#FFFFFF"
                type="submit"
                borderRadius="20px"
                fontWeight="600"
                fontSize="0.875rem"
                paddingX="20px"
                onClick={() => {
                        logout().then(
                            setIsLoggedIn(false)
                        ).catch((e) => {
                            console.log(e);
                        })
                    }
                }
                >Sign out</Button>
            </Flex>
            </MenuList>
        </Menu>
    );
}

export default UserMenu;
