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
import password_reset from "../../assets/password_reset.svg";
import { logout } from '../../utils/api';
import * as router from "react-router-dom";
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import ChangePasswordModal from '../ChangePasswordModal';

const NavBar = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
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
                                <HStack 
                                gap="12px" 
                                onClick={() => {
                                    setIsChangePasswordOpen(true);
                                }}
                                _hover={{cursor:"pointer"}}
                                >
                                    <Image src={password_reset} alt="Password Reset" w="24px" h="24px" objectFit="contain"/>
                                    <Text color="#444444" fontWeight="500" textDecorationLine="underline">
                                        Change password
                                    </Text>
                                </HStack>
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
            <ChangePasswordModal isOpen={isChangePasswordOpen} onClose={() =>{
                setIsChangePasswordOpen(false);
            }}/>
        </Flex>
    )
}

export default NavBar;