import { 
    Box, 
    Flex, 
    HStack, 
    Heading 
} from "@chakra-ui/react";
import { CartContext } from "../../context/cart.context";
import { 
    useContext,
} 
from "react";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import OrderInfo from "./OrderInfo";

const CheckOut = () => {
    const { cartItems } = useContext(CartContext);
    return(
    <Flex
    flexDir="column"
    w="full"
    gap="40px"
    px="400px"
    mt="100px"
    mb="100px"
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
        alignItems="flex-start"
        gap="40px"
        >
            <Flex
            flexDir="column"
            gap="30px"
            >
                <Card1 items={cartItems}/>   
                <Card2 
                />             
                <Card3
                />
            </Flex>
            <OrderInfo/>
        </HStack>
    </Flex>
    )
}

export default CheckOut;