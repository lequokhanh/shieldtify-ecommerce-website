import {
    Box,
    Flex,
    HStack,
    Image,
    Text,
    useToast,
    Menu,
    MenuButton,
    MenuList,
    Button,
} from '@chakra-ui/react';
import logo from "../../assets/shieldtify-logo.svg";
import { logout } from '../../utils/api';
import * as router from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { isLoggedIn, currentUser, setIsLoggedIn } = useContext(AuthContext);
    return (
        <Flex 
        alignItems="center" 
        h="76px" 
        w="100%"
        pl="10px"  
        justifyContent="space-between" 
        paddingX="30px"
        borderBottom="1px solid rgba(68, 68, 68, 0.4)" 
        fontFamily="Inter, sans-serif" 
        position="sticky"
        top="0" 
        left="0"
        zIndex={99}
        bgColor='white'
        >
            <Box as={router.Link} to={isLoggedIn ? "/manage/dashboard" : "/sign-in" } _hover={{cursor: "pointer"}}>
                <Image src={logo} alt="Logo" w="110px" h="49px" objectFit="contain"/>
            </Box>
            {
                isLoggedIn && (
                    <Menu offset={[10, 30]}>
                        <MenuButton>
                            <HStack fontFamily="Inter" gap="20px" _hover={{cursor:"pointer"}}>
                                {currentUser ? (
                                    <Text color="shieldtify.400" fontWeight="400">{currentUser.display_name}</Text>
                                ) : null}
                                <ChevronDownIcon/>
                            </HStack>
                        </MenuButton>
                        <MenuList>
                            <Flex
                                gap="30px"
                                flexDir="column"
                                padding="27px 20px"
                                fontFamily="Inter, sans-serif"
                            >
                                <Flex>
                                    <Text>Hello,&nbsp;</Text>
                                    {currentUser ? (
                                        <Text color="gray">{currentUser.display_name}</Text>
                                    ) : null}
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
                                    _hover={{cursor:"pointer"}}
                                    onClick={() => {
                                        logout()
                                            .then(() => {
                                                setIsLoggedIn(false)
                                                navigate('/sign-in')
                                                toast({
                                                    title: 'Success',
                                                    description: 'Logged out',
                                                    status: 'success',
                                                    duration: 2000,
                                                    isClosable: true,
                                                })
                                            })
                                            .catch((err) => {
                                                toast({
                                                    title: 'Error',
                                                    description: err.message,
                                                    status: 'error',
                                                    duration: 2000,
                                                    isClosable: true,
                                                })
                                            })
                                    }}
                                >
                                    Sign out
                                </Button>
                        </Flex>
                    </MenuList>
                </Menu>
                )
            }
        </Flex>
    )
}

export default NavBar;