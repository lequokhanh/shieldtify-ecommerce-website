import { 
    Box, 
    Flex, 
    HStack, 
    Heading 
} from "@chakra-ui/react";
import { CartContext } from "../../context/cart.context";
import { 
    useContext, useEffect,
} 
from "react";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import OrderInfo from "./OrderInfo";
import { getUserCart } from "../../utils/api";

const CheckOut = () => {
    const { cartItems } = useContext(CartContext);
    useEffect(() => {
        async function checkData(){
            await getUserCart().then((res) => {
                if(!res.data.data.cart){
                    window.location.href = '/404'
                }
            })
        }
        checkData();
    })
    return (
      <Flex flexDir="column" w="full" gap="40px" mt="100px" mb="100px" alignItems="center">
        <HStack justifyContent="center" alignItems="flex-start" gap="40px">
          <Flex flexDir="column" gap="30px">
            <Card1 items={cartItems} />
            <Card2 />
            <Card3 />
          </Flex>
          <OrderInfo/>
        </HStack>
      </Flex>
    );
  };

export default CheckOut;