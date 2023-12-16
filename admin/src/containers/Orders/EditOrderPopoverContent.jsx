import { Button, Flex, FormControl, FormLabel, Input, PopoverArrow, Text } from "@chakra-ui/react";

const EditOrderPopoverContent = ({ product }) => {
    return(
        <>
            <PopoverArrow/>
            <Flex flexDir="column" gap="15px" padding="25px 20px" >
                <Flex flexDir="column" gap="12px">
                    <FormControl >
                        <Flex justifyContent="space-between" alignItems="center" w="full">
                            <FormLabel color="#444444" fontSize="0.875rem" fontWeight="300">
                                Quantity
                            </FormLabel>
                            <Flex
                                alignItems="center"
                                bgColor="shieldtify.300"
                                fontFamily="Robot, sans-serif"
                                w="max-content"
                                paddingX="7.5px"
                                border="1px solid #444444"
                                borderRadius="8.3333px"
                            >
                                <Text
                                    fontSize="1.25rem"
                                    fontWeight="300"
                                    color="shieldtify.100"
                                    _hover={{
                                        cursor: 'pointer',
                                    }}
                                    // onClick={decreaseCartQuantity}
                                >
                                    -
                                </Text>
                                <Input
                                type="number"
                                paddingX="5px"
                                defaultValue={product.quantity}
                                // value={itemQuantity}
                                textAlign="center"
                                // onChange={async (e) => {
                                //     if (e.target.value === '') {
                                //         setItemQuantity(1)
                                //     } else {
                                //         await updateCart({
                                //             item: item.itemid,
                                //             quantity: e.target.value,
                                //         })
                                //             .then((res) => {
                                //                 setItemQuantity(
                                //                     res.data.data.cart[0].quantity
                                //                 )
                                //                 setCartItems(res.data.data.cart)
                                //                 setOutOfStockItems(
                                //                     res.data.data.out_of_stock
                                //                 )
                                //                 setCartTotal(res.data.data.total)
                                //                 setDiscountedPrice(0)
                                //                 setIsValueInvalid(false)
                                //             })
                                //             .catch(() => {
                                //                 setIsValueInvalid(true)
                                //             })
                                //     }
                                // }}
                                // isInvalid={isValueInvalid}
                                w="50px"
                                border="none"
                                variant="unstyled"
                                />
                                <Text
                                    fontSize="1.25rem"
                                    fontWeight="300"
                                    color="shieldtify.100"
                                    _hover={{
                                        cursor: 'pointer',
                                    }}
                                    // onClick={increaseCartQuantity}
                                >
                                    +
                                </Text>
                            </Flex>
                        </Flex>
                    </FormControl>
                    <FormControl >
                        <Flex justifyContent="space-between" alignItems="center">
                            <FormLabel color="#444444" fontSize="0.875rem" fontWeight="300">
                                Sales price
                            </FormLabel>
                            <Flex
                                alignItems="center"
                                bgColor="#DEE1E6"
                                fontFamily="Robot, sans-serif"
                                w="max-content"
                                borderRadius="8.5px"
                                justifyContent="flex-end"
                            >
                                <Input
                                defaultValue={product.new_price}
                                id="price"
                                w="85.36px"
                                h="32px"
                                name="price"
                                border="none"
                                variant="unstyled"
                                type="number"
                                textAlign="center"
                                />
                            </Flex>
                        </Flex>
                    </FormControl>
                </Flex> 
                <Button
                colorScheme="blackAlpha"
                color="#FFFFFF"
                bgColor="#2D2D2D"
                borderRadius="25px"
                fontWeight="600"
                >
                    Submit
                </Button>
            </Flex> 
        </>
    )
}

export default EditOrderPopoverContent;