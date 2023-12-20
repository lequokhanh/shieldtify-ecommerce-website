import { 
    Box, 
    Button, 
    Divider, 
    Flex, 
    FormControl, 
    FormLabel, 
    Grid, 
    HStack, 
    Input, 
    Modal, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    Popover, 
    // PopoverArrow, 
    PopoverContent, 
    PopoverTrigger, 
    Radio, 
    RadioGroup,
    Spacer,
    Text,
    VStack,
    useToast, 
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import ProductListCard from "./ProductsListCard"
import { ChevronDownIcon } from "@chakra-ui/icons"
import AddressPopoverContent from "./AddressPopoverContent"
import { updateOrder } from "../../utils/api"

const OrderModal = ({isOpen, onClose, order, setOrder, currentUserAddresses, selectedAddress, setSelectedAddress, fetchData}) => {
    const toast = useToast();
    return (
    <Modal 
    isOpen={isOpen} 
    onClose={onClose}
    blockScrollOnMount={'false'} 
    size="3xl"
    >
        <ModalOverlay/>
        <ModalContent
        borderRadius={'10px'}
        minH="420px"
        fontFamily="Inter"
        >
            <ModalHeader
            bgColor={'#2D2D2D'}
            color={'white'}
            borderTopRadius={'10px'}>
                Order details
            </ModalHeader>
            <ModalCloseButton
            bgColor={'white'}
            borderRadius={'50%'}
            size={'sm'}
            mt={'10px'}
            mr={'10px'}
            />
            <Flex justifyContent="center" py="28px">
                <Formik
                initialValues={{
                    paymentMethod: order.payment_method || '',
                    receiveMethod: order.receive_method || '',
                    orderStatus: order.order_status || '',
                }}
                onSubmit={ async (values) => {
                    await updateOrder({
                        orderId: order.uid,
                        newOrder: { 
                            payment_method: values.paymentMethod,
                            receive_method: values.receiveMethod,
                            order_status: values.orderStatus,
                            products: order.order_item,
                            addressid: selectedAddress && selectedAddress.uid, 
                        }
                    }).then(() => {
                        toast({
                            title: "Order updated successfully",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        });
                        fetchData();
                    }).catch((err) => {
                        console.log(err);
                        toast({
                            title: "Order updated failed",
                            description: err.response.data.message,   
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                        });
                    })
                }}
                >
                    <Form>
                        <VStack px="20px">
                            <Flex gap="40px">
                                <Flex flexDir="column" gap="15px">
                                    <FormControl>
                                        <Flex flexDir="column" gap="5px">
                                            <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'700'}
                                            color={'#424856'}
                                            mb={'5px'}
                                            >
                                                Order ID
                                            </FormLabel>
                                            <Input
                                            placeholder="Order ID"
                                            value={order.uid}
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                        />
                                        </Flex>
                                    </FormControl>
                                    <Field name="paymentMethod" type="radio">
                                        {({field,form}) => (
                                            <FormControl isInvalid={form.errors.paymentMethod && form.touched.paymentMethod}>
                                                <Flex flexDir="column" gap="8px">
                                                    <FormLabel fontSize="0.875rem" fontWeight="700" color="#424856">
                                                        Payment method
                                                    </FormLabel>
                                                    <RadioGroup defaultValue={order.payment_method}>
                                                        <HStack gap="33px" pl="10px">
                                                            <Radio
                                                            {...field} 
                                                            value="Cash"
                                                            colorScheme="blackAlpha"
                                                            borderColor="#D9D9D9"
                                                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"                                                            
                                                            >
                                                                Cash
                                                            </Radio>
                                                            <Radio
                                                            {...field} 
                                                            value="Card"
                                                            colorScheme="blackAlpha"
                                                            borderColor="#D9D9D9"
                                                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                                                            >
                                                                Bank transfers
                                                            </Radio>
                                                        </HStack>
                                                    </RadioGroup>
                                                </Flex>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="receiveMethod" type="radio">
                                        {({field,form}) => (
                                            <FormControl isInvalid={form.errors.receiveMethod && form.touched.receiveMethod}>
                                                <Flex flexDir="column" gap="8px">
                                                    <FormLabel fontSize="0.875rem" fontWeight="700" color="#424856">
                                                        Delivery method
                                                    </FormLabel>
                                                    <RadioGroup defaultValue={order.receive_method}>
                                                        <HStack gap="33px" pl="10px">
                                                            <Radio
                                                            {...field}
                                                            value="In-store"
                                                            colorScheme="blackAlpha"
                                                            borderColor="#D9D9D9"
                                                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                                                            >
                                                                In-store pick up
                                                            </Radio>
                                                            <Radio
                                                            {...field}
                                                            value="Home"
                                                            colorScheme="blackAlpha"
                                                            borderColor="#D9D9D9"
                                                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"                                                           
                                                            >
                                                                Home delivery
                                                            </Radio>
                                                        </HStack>
                                                    </RadioGroup>
                                                </Flex>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <FormControl>
                                        <Flex flexDir="column" gap="15px">
                                            <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'700'}
                                            color={'#424856'}
                                            mb={'5px'}
                                            >
                                            Client
                                            </FormLabel>
                                            <Input
                                            placeholder="Client name"
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                            value={order && order.client && order.client.display_name}
                                            />
                                        </Flex>
                                    </FormControl>
                                    {
                                        order && order.receive_method !== "In-store" && (

                                            <FormControl>
                                                <Flex flexDir="column" gap="15px">
                                                    <FormLabel
                                                    fontSize={'14px'}
                                                    fontFamily={'Inter'}
                                                    fontWeight={'700'}
                                                    color={'#424856'}
                                                    mb={'5px'}
                                                    >
                                                    Recipient information
                                                    </FormLabel>
                                                    <Box
                                                    border="1px dashed"
                                                    borderRadius={'12px'}
                                                    padding={'16px'}
                                                    >
                                                        <Flex flexDir="column" gap="15px">
                                                            <HStack justifyContent="space-between">
                                                                <Text fontWeight="700" fontSize="0.875rem" color="#424856">
                                                                    Selected address
                                                                </Text>
                                                                <Popover>
                                                                    {({onClose}) => (
                                                                    <>
                                                                        <PopoverTrigger>
                                                                            <HStack 
                                                                            padding="7px 12px" 
                                                                            border="1px solid #444444"
                                                                            borderRadius="12px" 
                                                                            as="button"
                                                                            gap="5px"
                                                                            type="button"
                                                                            w="140px"
                                                                            justifyContent="space-between"
                                                                            _hover={{cursor:"pointer"}}
                                                                            >   
                                                                                <Text fontSize="0.875rem" color="#444444" fontWeight="400" isTruncated>
                                                                                    {selectedAddress && selectedAddress.address}
                                                                                </Text>
                                                                                <ChevronDownIcon boxSize="4" color="#444444"/>
                                                                            </HStack>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent>
                                                                            <AddressPopoverContent
                                                                            currentUserAddresses={currentUserAddresses}
                                                                            selectedAddress={selectedAddress}
                                                                            setSelectedAddress={setSelectedAddress}
                                                                            setOrder={setOrder}
                                                                            onClose={onClose}
                                                                            />
                                                                        </PopoverContent>
                                                                    </>)}
                                                                </Popover>
                                                            </HStack>
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
                                                                        selectedAddress && selectedAddress.address
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
                                                                    placeholder="Address city"
                                                                    value={
                                                                        selectedAddress && selectedAddress.city
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
                                                                    placeholder="Address province"
                                                                    value = {
                                                                        selectedAddress && selectedAddress.province
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
                                                                    placeholder="Phone number"
                                                                    value= {
                                                                        selectedAddress && selectedAddress.phone_number
                                                                    }
                                                                    isReadOnly
                                                                    padding={'24px 12px'}
                                                                    fontSize={'14px'}
                                                                    fontWeight={'400'}
                                                                    bg="#F3F4F6"
                                                                />
                                                            </FormControl>
                                                        </Flex>
                                                </Box>
                                                </Flex>
                                            </FormControl>
                                        )
                                    }
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
                                                    {order.old_total >= order.new_total ? order.old_total : order.new_total}
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
                                                    {
                                                    (order.old_total <= order.new_total)
                                                        ? ''
                                                        : `- ${parseFloat((order.old_total - order.new_total).toFixed(2))}$`
                                                    }
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
                                                    {order.new_total}
                                                    {'$'}
                                                </Box>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex flexDir="column" gap="15px">
                                    <FormControl>
                                        <Flex flexDir="column" gap="5px">
                                            <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'700'}
                                            color={'#424856'}
                                            mb={'5px'}
                                            >
                                                Order date
                                            </FormLabel>
                                            <Input
                                            placeholder="Order Date"
                                            value={new Date(
                                                order.order_date
                                            ).toLocaleDateString('en-UK')}
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                            />
                                        </Flex>
                                    </FormControl>
                                    <Field name="orderStatus" type="radio">
                                        {({field, form}) => (
                                            <FormControl isInvalid={form.errors.orderStatus && form.touched.orderStatus}>
                                                <Flex flexDir="column" gap="8px">
                                                    <FormLabel fontSize="0.875rem" fontWeight="700" color="#424856">
                                                        Order status
                                                    </FormLabel>
                                                    <RadioGroup defaultValue={order.order_status    }>
                                                        <Grid gridTemplateColumns="repeat(2,1fr)" gap="33px" pl="10px">
                                                            <Radio
                                                            {...field} 
                                                            value="Initiated"
                                                            colorScheme="blackAlpha"
                                                            borderColor="#D9D9D9"
                                                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"                                                            
                                                            >
                                                                Initiated
                                                            </Radio>
                                                            <Radio
                                                            {...field} 
                                                            value="Processing"
                                                            colorScheme="blackAlpha"
                                                            borderColor="#D9D9D9"
                                                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"                                                            
                                                            >
                                                                Processing
                                                            </Radio>
                                                            <Radio
                                                            {...field} 
                                                            value="Canceled"
                                                            colorScheme="blackAlpha"
                                                            borderColor="#D9D9D9"
                                                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"                                                            
                                                            >
                                                                Canceled
                                                            </Radio>
                                                            <Radio
                                                            {...field} 
                                                            value="Succeed"
                                                            colorScheme="blackAlpha"
                                                            borderColor="#D9D9D9"
                                                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"                                                            
                                                            >
                                                                Succeed
                                                            </Radio>
                                                        </Grid>
                                                    </RadioGroup>
                                                </Flex>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <FormControl>
                                        <Flex flexDir="column" gap="5px">
                                            <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'700'}
                                            color={'#424856'}
                                            mb={'5px'}
                                            >
                                                Promotion
                                            </FormLabel>
                                            <Input
                                            placeholder="Promotion Code"
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                            />
                                        </Flex>
                                    </FormControl>
                                    <FormControl>
                                        <Flex flexDir="column" gap="5px">
                                            <FormLabel
                                            fontSize={'14px'}
                                            fontFamily={'Inter'}
                                            fontWeight={'700'}
                                            color={'#424856'}
                                            mb={'5px'}
                                            >
                                                Supported by
                                            </FormLabel>
                                            <Input
                                            placeholder="Supported by"
                                            // value={new Date(
                                            //     orderDetail.order_date
                                            // ).toLocaleDateString('en-UK')}
                                            isReadOnly
                                            padding={'24px 12px'}
                                            fontSize={'14px'}
                                            fontWeight={'400'}
                                            bg="#F3F4F6"
                                            />
                                        </Flex>
                                    </FormControl>
                                    <FormControl>
                                        <Flex flexDir="column" gap="5px">
                                            <FormLabel fontSize="0.875rem" fontWeight="700" color="#424856">
                                                Product list
                                            </FormLabel>
                                            <Flex
                                            border="1px dashed"
                                            borderRadius={'12px'}
                                            padding={'16px'}
                                            display={'flex'}
                                            flexDir={'column'}
                                            gap={'20px'}
                                            fontFamily={'Inter'}
                                            fontSize={'16px'}
                                            maxHeight={'525px'}
                                            overflowY={'auto'}
                                            sx={{
                                                '::-webkit-scrollbar': {
                                                    display: 'none',
                                                },
                                            }}
                                            >
                                                {
                                                    order && order.order_item && order.order_item.map((product, index) => (
                                                        <Box key={index}>
                                                            <ProductListCard product={product} setOrder={setOrder} order={order}/>
                                                        </Box>
                                                    ))
                                                }
                                            </Flex>
                                        </Flex>
                                    </FormControl>
                                </Flex>
                            </Flex>
                            <Button
                            mt="5px"
                            borderRadius="25px" 
                            bg="#2D2D2D" 
                            color="#FFFFFF" 
                            fontWeight="600" 
                            colorScheme="blackAlpha" 
                            w="full"
                            type="submit"
                            >
                                Save
                            </Button>
                        </VStack>
                    </Form>
                </Formik>
            </Flex>
        </ModalContent>
    </Modal>
    )
}

export default OrderModal