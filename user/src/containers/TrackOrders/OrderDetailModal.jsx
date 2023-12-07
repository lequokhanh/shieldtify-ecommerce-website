/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Button,
    Flex,
    Input,
    Box,
    Divider,
    Spacer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getOrderByID } from '../../utils/api.js'
const OrderDetailModal = ({ isOpen, onClose, order }) => {
    const [orderDetail, setOrderDetail] = useState(null)
    useEffect(() => {
        async function fetchData() {
            await getOrderByID(order.uid).then((res) => {
                console.log(res.data.data)
                setOrderDetail(res.data.data)
            })
        }
        fetchData()
    }, [])
    return (
        <>
            {orderDetail && (
                <Modal isOpen={isOpen} onClose={onClose} size="4xl">
                    <ModalOverlay />
                    <ModalContent borderRadius={'15px'}>
                        <ModalHeader
                            bgColor={'#2D2D2D'}
                            color={'white'}
                            borderTopRadius={'10px'}
                        >
                            Order Details
                        </ModalHeader>
                        <ModalCloseButton
                            bgColor={'white'}
                            borderRadius={'50%'}
                            size={'sm'}
                            mt={'10px'}
                            mr={'10px'}
                        />
                        <ModalBody>
                            <Flex
                                flexDir={'row'}
                                justifyContent={'center'}
                                gap={'44px'}
                                paddingY={'20px'}
                            >
                                <Flex
                                    flexDir={'column'}
                                    width={'383px'}
                                    gap="10px"
                                >
                                    <FormControl>
                                        <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'800'}
                                            color={'#424856'}
                                            mb={'5px'}
                                        >
                                            Order ID
                                        </FormLabel>
                                        <Input
                                            placeholder="Order ID"
                                            value={orderDetail.uid}
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                            isDisabled
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'800'}
                                            color={'#424856'}
                                            mb={'5px'}
                                        >
                                            Payment method
                                        </FormLabel>
                                        <Input
                                            placeholder="Payment method"
                                            value={orderDetail.payment_method}
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'800'}
                                            color={'#424856'}
                                            mb={'5px'}
                                        >
                                            Receive method
                                        </FormLabel>
                                        <Input
                                            placeholder="Receive method"
                                            value={orderDetail.receive_method}
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                        />
                                    </FormControl>
                                    <Flex flexDir={'column'} gap={'7px'}>
                                        <Box
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'800'}
                                            color={'#424856'}
                                        >
                                            Recipient information
                                        </Box>
                                        <Box
                                            border="1px dashed"
                                            borderRadius={'12px'}
                                            padding={'16px'}
                                        >
                                            <FormControl>
                                                <FormLabel
                                                    fontSize={'14px'}
                                                    fontFamily={'Inter'}
                                                    fontWeight={'800'}
                                                    color={'#424856'}
                                                    mb={'5px'}
                                                >
                                                    Address
                                                </FormLabel>
                                                <Input
                                                    placeholder="Receive address"
                                                    value={
                                                        orderDetail
                                                            .shipping_address
                                                            .address
                                                    }
                                                    isReadOnly
                                                    padding={'24px 12px'}
                                                    fontSize={'14px'}
                                                    fontWeight={'400'}
                                                    bg="#F3F4F6"
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel
                                                    fontSize={'14px'}
                                                    fontFamily={'Inter'}
                                                    fontWeight={'800'}
                                                    color={'#424856'}
                                                    mb={'5px'}
                                                >
                                                    City
                                                </FormLabel>
                                                <Input
                                                    placeholder="Receive address"
                                                    value={
                                                        orderDetail
                                                            .shipping_address
                                                            .city
                                                    }
                                                    isReadOnly
                                                    padding={'24px 12px'}
                                                    fontSize={'14px'}
                                                    fontWeight={'400'}
                                                    bg="#F3F4F6"
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel
                                                    fontSize={'14px'}
                                                    fontFamily={'Inter'}
                                                    fontWeight={'800'}
                                                    color={'#424856'}
                                                    mb={'5px'}
                                                >
                                                    Province
                                                </FormLabel>
                                                <Input
                                                    placeholder="Receive address"
                                                    value={
                                                        orderDetail
                                                            .shipping_address
                                                            .province
                                                    }
                                                    isReadOnly
                                                    padding={'24px 12px'}
                                                    fontSize={'14px'}
                                                    fontWeight={'400'}
                                                    bg="#F3F4F6"
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel
                                                    fontSize={'14px'}
                                                    fontFamily={'Inter'}
                                                    fontWeight={'800'}
                                                    color={'#424856'}
                                                    mb={'5px'}
                                                >
                                                    Phone number
                                                </FormLabel>
                                                <Input
                                                    placeholder="Receive address"
                                                    value={
                                                        orderDetail
                                                            .shipping_address
                                                            .phone_number
                                                    }
                                                    isReadOnly
                                                    padding={'24px 12px'}
                                                    fontSize={'14px'}
                                                    fontWeight={'400'}
                                                    bg="#F3F4F6"
                                                />
                                            </FormControl>
                                        </Box>
                                    </Flex>
                                    <Flex flexDir={'column'} gap={'7px'}>
                                        <Box
                                            fontSize={'18px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'800'}
                                            color={'#424856'}
                                        >
                                            Summary
                                        </Box>
                                        <Flex
                                            flexDir={'column'}
                                            gap="10px"
                                            fontFamily={'Inter'}
                                            paddingLeft={'16px'}
                                        >
                                            <Flex
                                                flexDir={'row'}
                                                width={'full'}
                                            >
                                                <Box
                                                    fontSize={'16px'}
                                                    fontWeight={'400'}
                                                >
                                                    Subtotal
                                                </Box>
                                                <Spacer />
                                                <Box
                                                    fontSize={'16px'}
                                                    fontWeight={'700'}
                                                >
                                                    {orderDetail.old_total}
                                                    {'$'}
                                                </Box>
                                            </Flex>
                                            <Flex
                                                flexDir={'row'}
                                                width={'full'}
                                            >
                                                <Box
                                                    fontSize={'16px'}
                                                    fontWeight={'400'}
                                                >
                                                    Discount
                                                </Box>
                                                <Spacer />
                                                <Box
                                                    fontSize={'16px'}
                                                    fontWeight={'700'}
                                                >
                                                    {orderDetail.old_total -
                                                        orderDetail.new_total ===
                                                    0
                                                        ? ''
                                                        : '-'}
                                                    {orderDetail.old_total -
                                                        orderDetail.new_total}
                                                    {'$'}
                                                </Box>
                                            </Flex>
                                            <Divider />
                                            <Flex
                                                flexDir={'row'}
                                                width={'full'}
                                                fontSize={'18px'}
                                                fontWeight={'700'}
                                            >
                                                <Box>Total</Box>
                                                <Spacer />
                                                <Box>
                                                    {orderDetail.new_total}
                                                    {'$'}
                                                </Box>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex
                                    flexDir={'column'}
                                    width={'383px'}
                                    gap="10px"
                                >
                                    <FormControl>
                                        <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'800'}
                                            color={'#424856'}
                                            mb={'5px'}
                                        >
                                            Order date
                                        </FormLabel>
                                        <Input
                                            placeholder="Order Date"
                                            value={new Date(
                                                orderDetail.order_date
                                            ).toLocaleDateString('en-UK')}
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'800'}
                                            color={'#424856'}
                                            mb={'5px'}
                                        >
                                            Order status
                                        </FormLabel>
                                        <Input
                                            placeholder="Order ID"
                                            value={orderDetail.order_status}
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'800'}
                                            color={'#424856'}
                                            mb={'5px'}
                                        >
                                            Promotion
                                        </FormLabel>
                                        <Input
                                            placeholder="No Promotion Code"
                                            value={orderDetail.promotion_code}
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                        />
                                    </FormControl>
                                    <Flex flexDir={'column'} gap={'7px'}>
                                        <Box
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'800'}
                                            color={'#424856'}
                                        >
                                            Recipient information
                                        </Box>
                                        <Box
                                            border="1px dashed"
                                            borderRadius={'12px'}
                                            padding={'16px'}
                                            display={'flex'}
                                            flexDir={'column'}
                                            gap={'20px'}
                                            fontFamily={'Inter'}
                                            fontSize={'16px'}
                                            maxHeight={'500px'}
                                            overflowY={'auto'}
                                            sx={{
                                                '::-webkit-scrollbar': {
                                                    display: 'none',
                                                },
                                            }}
                                        >
                                            {orderDetail.order_item.map(
                                                (item, _) => {
                                                    return (
                                                        <Flex
                                                            flexDir={'row'}
                                                            alignItems={
                                                                'center'
                                                            }
                                                            gap={'13px'}
                                                            bg={'#F3F4F6'}
                                                            padding={'16px'}
                                                            borderRadius={
                                                                '12px'
                                                            }
                                                        >
                                                            <Box>
                                                                <Box>
                                                                    x
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </Box>
                                                            </Box>
                                                            <Box>
                                                                <Box
                                                                    fontSize={
                                                                        '14px'
                                                                    }
                                                                    fontWeight={
                                                                        '700'
                                                                    }
                                                                >
                                                                    {
                                                                        item
                                                                            .item
                                                                            .name
                                                                    }
                                                                </Box>
                                                                <Flex
                                                                    gap={'10px'}
                                                                >
                                                                    <Box
                                                                        textDecoration={
                                                                            item.old_price !==
                                                                                item.new_price &&
                                                                            'line-through'
                                                                        }
                                                                    >
                                                                        {
                                                                            item.old_price
                                                                        }
                                                                        $
                                                                    </Box>
                                                                    <Box
                                                                        textColor={
                                                                            '#FF6262'
                                                                        }
                                                                    >
                                                                        {item.old_price !==
                                                                            item.new_price &&
                                                                            item.new_price +
                                                                                '$'}
                                                                    </Box>
                                                                </Flex>
                                                            </Box>
                                                        </Flex>
                                                    )
                                                }
                                            )}
                                        </Box>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="blackAlpha"
                                bgColor="#2D2D2D"
                                onClick={onClose}
                                borderRadius="25px"
                                w={'100%'}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}

export default OrderDetailModal
