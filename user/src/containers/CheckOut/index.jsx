import { Box, Flex, HStack, Heading } from '@chakra-ui/react'
import { CartContext } from '../../context/cart.context'
import { useContext, useEffect } from 'react'
import Card1 from './Card1'
import Card2 from './Card2'
import Card3 from './Card3'
import OrderInfo from './OrderInfo'
import { CheckOutContext } from '../../context/checkout.context'

const CheckOut = () => {
    const { cartItems, isOrderConfirmed } = useContext(CartContext)
    const { isInStorePickUp } = useContext(CheckOutContext)
    useEffect(() => {
        if (!isOrderConfirmed) {
            window.location.href = '/404'
        }
    }, [])
    useEffect(() => {}, [isInStorePickUp])
    return (
        <Flex alignItems="center">
            <Flex
                flexDir="column"
                w="full"
                gap="40px"
                mt="100px"
                mb="100px"
                alignItems="flex-start"
            >
                <Box>
                    <Heading
                        color="#171A1F"
                        fontSize="2.5rem"
                        fontWeight="800"
                        lineHeight="56px"
                    >
                        Checkout
                    </Heading>
                </Box>
                <HStack
                    justifyContent="center"
                    alignItems="flex-start"
                    gap="40px"
                >
                    <Flex flexDir="column" gap="30px">
                        <Card1 items={cartItems} />
                        <Card2 />
                        {!isInStorePickUp && <Card3 />}
                    </Flex>
                    <OrderInfo />
                </HStack>
            </Flex>
        </Flex>
    )
}

export default CheckOut
