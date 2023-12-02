import { 
    Box, 
    Flex,
    HStack,
    Image,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Tr
} from "@chakra-ui/react";
import cart_icon from '../../assets/CheckOut/cart_icon.svg';

const Card1 = ({items}) => {
    return (
        <Box
        padding="29px 15px"
        borderRadius="18px"
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.3)"
        >
            <Flex
            flexDir="column"
            gap="30px"
            >
                <HStack pl="20px">
                    <Image src={cart_icon} w="24px" h="24px" objectFit="contain"/>
                    <Text
                    color="shieldtify.checkout"
                    fontSize="1.125rem"
                    fontWeight="700"
                    >
                        Order Summary
                    </Text>
                </HStack>      
                    <TableContainer>
                        <Table variant="unstyled">
                                <Tr >
                                    <Th
                                    color="#9095A1"
                                    fontSize="0.875rem"
                                    fontWeight="600"
                                    >
                                        Name
                                    </Th>
                                    <Th
                                    color="#9095A1"
                                    fontSize="0.875rem"
                                    fontWeight="600"   
                                    >
                                        Price
                                    </Th>
                                    <Th
                                    color="#9095A1"
                                    fontSize="0.875rem"
                                    fontWeight="600"                                
                                    >
                                        Quantity
                                    </Th>
                                    <Th
                                    color="#9095A1"
                                    fontSize="0.875rem"
                                    fontWeight="600"                                
                                    >
                                        Total
                                    </Th>
                                </Tr>
                                <Tbody
                                fontFamily="Inter, sans-serif"
                                >
                                    {
                                        items.map((item) => {
                                            return (
                                                <Tr key={item.itemid}>
                                                    <Td>
                                                        <Flex alignItems="center" gap="10px" w="400px" >
                                                            <Image src={item.primary_img} w="60px" h="60px" objectFit="contain"/>
                                                            <Text
                                                            fontSize="0.875rem"
                                                            fontWeight="700"
                                                            color="shieldtify.checkout"
                                                            isTruncated
                                                            >
                                                                {item.name}
                                                            </Text>
                                                        </Flex>
                                                    </Td>
                                                    <Td >
                                                        <Text
                                                        fontSize="0.875rem"
                                                        fontWeight="400"
                                                        color="shieldtify.checkout"
                                                        >
                                                            {item.old_price ? item.old_price : item.price}$
                                                        </Text>
                                                    </Td>
                                                    <Td textAlign="center">
                                                        <Text
                                                        fontSize="0.875rem"
                                                        fontWeight="400"
                                                        color="shieldtify.checkout"
                                                        >
                                                            {item.quantity}
                                                        </Text>
                                                    </Td>
                                                    <Td>
                                                        <Text
                                                        fontSize="0.875rem"
                                                        fontWeight="700"
                                                        color="shieldtify.checkout"
                                                        >
                                                            ${parseFloat((item.quantity * (item.old_price ? item.old_price : item.price)).toFixed(2))}
                                                        </Text>
                                                    </Td>
                                                </Tr>
                                            )
                                        })
                                    }
                                </Tbody>
                        </Table>
                    </TableContainer>
                {/* </Flex> */}
            </Flex>
        </Box>
    )
}

export default Card1;