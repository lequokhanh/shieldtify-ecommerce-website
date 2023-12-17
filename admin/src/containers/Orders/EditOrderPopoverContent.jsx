import { Button, Flex, FormControl, FormLabel, Input, PopoverArrow, Text } from "@chakra-ui/react";

const EditOrderPopoverContent = ({ setOrder, order, unsubmittedProduct, setUnsubmittedProduct }) => {
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
                                    onClick={() => {
                                        if(unsubmittedProduct.quantity === 0) return;
                                        setUnsubmittedProduct({
                                            ...unsubmittedProduct,
                                            quantity: unsubmittedProduct.quantity - 1,
                                        })
                                    }}
                                >
                                    -
                                </Text>
                                <Input
                                type="number"
                                paddingX="5px"
                                value={unsubmittedProduct.quantity}
                                onChange={(e) => {
                                    setUnsubmittedProduct({
                                        ...unsubmittedProduct,
                                        quantity: parseInt(e.target.value),
                                    })
                                }}
                                textAlign="center"
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
                                    onClick={() => {
                                        setUnsubmittedProduct({
                                            ...unsubmittedProduct,
                                            quantity: unsubmittedProduct.quantity + 1,
                                        })
                                    }}
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
                                value={unsubmittedProduct.new_price}
                                onChange={(e) => {
                                    setUnsubmittedProduct({
                                        ...unsubmittedProduct,
                                        new_price: e.target.value,
                                    })
                                }}
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
                onClick={() => {
                    const newItems = order.order_item.map((p) => {
                            if (p.itemid === unsubmittedProduct.itemid) {
                                return unsubmittedProduct;
                            }
                            return p;
                    });
                    setOrder({
                        ...order,
                        order_item: newItems    
                    });
                }}
                >
                    Submit
                </Button>
            </Flex> 
        </>
    )
}

export default EditOrderPopoverContent;