import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import * as router from 'react-router-dom'
import logo from '../../assets/shieldtify-logo.svg'
import builder from '../../assets/builder.svg'
import cpu from '../../assets/cpu.svg'
import book from '../../assets/book.svg'
import message from '../../assets/message.svg'
import cart from '../../assets/Cart.svg'
import search_line from '../../assets/clarity_search-line.svg'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { CartContext } from '../../context/cart.context'
import UserMenu from '../UserMenu'
import SearchModal from '../SearchModal'
import CartModal from '../CartModal'
import ProductModal from '../ProductModal'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const NavBar = () => {
    const { isLoggedIn } = useContext(AuthContext)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isProductCateListOpen, setIsProductCateListOpen] = useState(false)
    const { cartCount } = useContext(CartContext)
    const toast = useToast()
    const navigate = useNavigate()
    const openSearch = () => {
        setIsSearchOpen(true)
    }
    const closeSeach = () => {
        setIsSearchOpen(false)
    }
    const openCart = () => {
        setIsCartOpen(true)
    }
    const closeCart = () => {
        setIsCartOpen(false)
    }
    const denyPermission = () => {
        toast({
            title: 'Error',
            description: 'You must log-in first to use this feature',
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
        navigate('/sign-in')
    }
    const openProductCateList = () => {
        setIsProductCateListOpen(true)
    }
    const closeProductCateList = () => {
        setIsProductCateListOpen(false)
    }
    return (
        <Flex
            alignItems="center"
            h="80px"
            w="full"
            justifyContent="space-between"
            paddingX="30px"
            borderBottom="1px solid rgba(68, 68, 68, 0.4)"
            fontFamily="Inter, sans-serif"
            position="fixed"
            top="0"
            left="0"
            zIndex={99}
            bgColor="white"
        >
            <Flex gap="1.875rem">
                <Box as={router.Link} to="/home" _hover={{ cursor: 'pointer' }}>
                    <Image src={logo} alt="Logo" />
                </Box>
                <Button
                    paddingX="5px"
                    gap="8px"
                    variant="none"
                    as={router.Link}
                    to="#"
                    _hover={{
                        cursor: 'pointer',
                        textDecorationLine: 'underline',
                    }}
                    color="shieldtify.100"
                >
                    <Image src={builder} alt="builder" />
                    <Text>Builder</Text>
                </Button>
                <Button
                    gap="8px"
                    paddingX="5px"
                    variant="none"
                    _hover={{
                        cursor: 'pointer',
                        textDecorationLine: 'underline',
                    }}
                    color="shieldtify.100"
                    onClick={openProductCateList}
                >
                    <Image src={cpu} alt="Products" />
                    <Text>Products</Text>
                    <ChevronDownIcon />
                </Button>
                <Button
                    gap="8px"
                    paddingX="5px"
                    variant="none"
                    as={router.Link}
                    to="#"
                    _hover={{
                        cursor: 'pointer',
                        textDecorationLine: 'underline',
                    }}
                    color="shieldtify.100"
                >
                    <Image src={book} alt="Guide" />
                    <Text>Guide</Text>
                </Button>
                <Button
                    gap="8px"
                    paddingX="5px"
                    variant="none"
                    as={router.Link}
                    to="#"
                    _hover={{
                        cursor: 'pointer',
                        textDecorationLine: 'underline',
                    }}
                    color="shieldtify.100"
                >
                    <Image src={message} alt="Forum" />
                    <Text>Forum</Text>
                </Button>
            </Flex>
            <Flex alignItems="center" gap="25px">
                {isLoggedIn ? (
                    <UserMenu />
                ) : (
                    <Flex alignItems="center" gap="15px">
                        <Text
                            fontSize="0.75rem"
                            fontWeight="600"
                            _hover={{
                                cursor: 'pointer',
                                textDecorationLine: 'underline',
                            }}
                            as={router.Link}
                            to="/sign-up"
                            color="shieldtify.100"
                        >
                            Sign up
                        </Text>
                        <Button
                            fontSize="0.75rem"
                            fontWeight="600"
                            borderRadius="20px"
                            colorScheme="blackAlpha"
                            bgColor="#2D2D2D"
                            color="#FFFFFF"
                            paddingX="28.5px"
                            as={router.Link}
                            to="/sign-in"
                        >
                            Sign in
                        </Button>
                    </Flex>
                )}
                <Flex
                    w="20px"
                    h="30px"
                    _hover={{ cursor: 'pointer' }}
                    position="relative"
                >
                    <Image
                        src={cart}
                        alt="Cart"
                        onClick={
                            isLoggedIn
                                ? window.location.pathname !== '/checkout'
                                    ? openCart
                                    : closeCart
                                : denyPermission
                        }
                    />
                    {isLoggedIn && cartCount > 0 && (
                        <Text
                            position="absolute"
                            fontSize="0.75rem"
                            right="-3"
                            top="-1"
                            bgColor="#FAFF00"
                            w="20px"
                            borderRadius="100vh"
                            textAlign="center"
                        >
                            {cartCount}
                        </Text>
                    )}
                </Flex>
                <Flex w="20px" h="30px" _hover={{ cursor: 'pointer' }}>
                    <Image
                        src={search_line}
                        alt="Search"
                        onClick={openSearch}
                    />
                </Flex>
            </Flex>
            <SearchModal isOpen={isSearchOpen} onClose={closeSeach} />
            <CartModal isOpen={isCartOpen} onClose={closeCart} />
            <ProductModal
                isOpen={isProductCateListOpen}
                onClose={closeProductCateList}
            />
        </Flex>
    )
}

export default NavBar
