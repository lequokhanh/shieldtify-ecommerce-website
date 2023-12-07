import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { CheckOutContext } from '../../context/checkout.context'
import { AuthContext } from '../../context/auth.context'
import complete from '../../assets/CheckOut/complete.svg'
import bill from '../../assets/Checkout/bill.svg'
import dollar_sign from '../../assets/CheckOut/dollar_sign.svg'
import { checkOutCompletedCategories } from '../../Categories'
import * as router from 'react-router-dom'

const CheckOutComplete = () => {
    const { currentUser } = useContext(AuthContext)
    const {
        paymentMethod,
        deliveryOptions,
        selectedAddress,
        orderList,
        orderId,
        orderTotal,
        isCheckOutClicked,
    } = useContext(CheckOutContext)
    const currentDate = new Date().toLocaleDateString('en-UK')
    useEffect(() => {
        if (!isCheckOutClicked) {
            window.location.href = '/404'
        }
    }, [])
    return (
        <VStack mt="100px" mb="130px" gap="10px">
            <VStack mb="20px">
                <Image
                    src={complete}
                    alt="complete"
                    w="250px"
                    h="225px"
                    objectFit="contain"
                />
                <Text
                    fontSize="2rem"
                    fontWeight="700"
                    color="shieldtify.checkout"
                    lineHeight="48px"
                    textAlign="center"
                    mt="20px"
                >
                    Thank you for your purchase! 🎉
                </Text>
                <Text
                    fontSize="0.875rem"
                    fontWeight="400"
                    fontFamily="Inter, sans-serif"
                    mt="10px"
                    color="#9095A1"
                >
                    You can review your orders in {'Track orders'} panel
                </Text>
            </VStack>
            <Flex gap="140px">
                <Flex flexDir="column" gap="20px">
                    <Text color="#565D6D" fontSize="1.25rem" fontWeight="600">
                        Order information
                    </Text>
                    <HStack alignItems="flex-start" gap="24px">
                        <Flex flexDir="column">
                            <Flex
                                flexDir="column"
                                fontFamily="Inter, sans-serif"
                                gap="22px"
                            >
                                {checkOutCompletedCategories.map((add) => (
                                    <Flex key={add.id} gap="12px">
                                        <Image
                                            src={add.img}
                                            alt={add.name}
                                            w="24px"
                                            h="24px"
                                        />
                                        <Text color="#9095A1" fontWeight="400">
                                            {add.name}
                                        </Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex flexDir="column" gap="22px" textAlign="right">
                            <Text color="shieldtify.checkout" fontWeight="700">
                                {currentDate}
                            </Text>
                            <Text color="shieldtify.checkout" fontWeight="700">
                                {currentUser.display_name}
                            </Text>
                            <Text color="shieldtify.checkout" fontWeight="700">
                                {paymentMethod}
                            </Text>
                            <Text color="shieldtify.checkout" fontWeight="700">
                                {deliveryOptions}
                            </Text>
                            <Flex flexDir="column" w="188px" textAlign="right">
                                <Text
                                    fontSize="0.875rem"
                                    fontWeight="400"
                                    color="shieldtify.checkout"
                                    isTruncated
                                >
                                    {selectedAddress.address}
                                </Text>
                                <Text
                                    fontSize="0.875rem"
                                    fontWeight="400"
                                    color="shieldtify.checkout"
                                >
                                    {selectedAddress.city}
                                </Text>
                                <Text
                                    fontSize="0.875rem"
                                    fontWeight="400"
                                    color="shieldtify.checkout"
                                >
                                    {selectedAddress.province}
                                </Text>
                                <Text
                                    fontSize="0.875rem"
                                    fontWeight="400"
                                    color="shieldtify.checkout"
                                >
                                    {selectedAddress.phone_number}
                                </Text>
                            </Flex>
                        </Flex>
                    </HStack>
                    <Divider w="full" />
                    <HStack>
                        <Flex flexDir="column" gap="34px" w="full">
                            <Flex gap="12px">
                                <Image
                                    src={bill}
                                    alt="Order number"
                                    w="24px"
                                    h="24px"
                                />
                                <Text color="#9095A1" fontWeight="400">
                                    Order number
                                </Text>
                            </Flex>
                            <Flex gap="12px" alignItems="flex-end">
                                <Image
                                    src={dollar_sign}
                                    alt="Total"
                                    w="24px"
                                    h="24px"
                                />
                                <Text color="#9095A1" fontWeight="400">
                                    Total
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex
                            flexDir="column"
                            gap="22px"
                            textAlign="right"
                            justifyContent="flex-end"
                        >
                            <Text
                                color="shieldtify.checkout"
                                fontWeight="700"
                                fontFamily="Roboto Mono, monospace"
                                fontSize="0.75rem"
                            >
                                {orderId}
                            </Text>
                            <Text
                                color="shieldtify.checkout"
                                fontWeight="700"
                                fontSize="1.5rem"
                            >
                                {orderTotal}$
                            </Text>
                        </Flex>
                    </HStack>
                    <Button
                        mt="20px"
                        colorScheme="blackAlpha"
                        w="max-content"
                        color="#FFFFFF"
                        bgColor="#444444"
                        padding="9px 16px"
                        as={router.Link}
                        to="/home"
                    >
                        Continue shopping
                    </Button>
                </Flex>
                <Flex flexDir="column" gap="20px">
                    <Text color="#565D6D" fontSize="1.25rem" fontWeight="600">
                        Order Line
                    </Text>
                    <VStack
                        alignItems="flex-start"
                        gap="40px"
                        maxH="455px"
                        overflowY="auto"
                    >
                        {orderList.map((item) => (
                            <Flex
                                key={item.id}
                                fontFamily="Inter, sans-serif"
                                gap="22px"
                            >
                                <Image
                                    src={item.primary_img}
                                    alt="item.name"
                                    w="80px"
                                    h="80px"
                                    objectFit="contain"
                                />
                                <Flex
                                    flexDir="column"
                                    justifyContent="space-between"
                                >
                                    <Box w="200px">
                                        <Text
                                            color="shieldtify.checkout"
                                            fontWeight="700"
                                            isTruncated
                                        >
                                            {item.name}
                                        </Text>
                                    </Box>
                                    <Text
                                        fontSize="0.75rem"
                                        bgColor="#F3F4F6"
                                        w="max-content"
                                        borderRadius="100vh"
                                        padding="4px 8px"
                                        textAlign="center"
                                    >
                                        x{item.quantity}
                                    </Text>
                                </Flex>
                                <Text
                                    fontSize="0.875rem"
                                    color="shieldtify.checkout"
                                    fontWeight="700"
                                    alignSelf="center"
                                    ml="80px"
                                >
                                    {parseFloat(
                                        (
                                            item.quantity *
                                            (item.old_price
                                                ? item.old_price
                                                : item.price)
                                        ).toFixed(2)
                                    )}
                                    $
                                </Text>
                            </Flex>
                        ))}
                    </VStack>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default CheckOutComplete
