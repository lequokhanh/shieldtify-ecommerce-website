import {
    Flex,
    Image,
    Text
} from "@chakra-ui/react";
import no_img from '../../assets/no_img.svg';
import remove_item from '../../assets/Cart/remove_item.svg';
import { useState } from "react";
import { updateCart } from "../../utils/api";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { getUserCart } from "../../utils/api";
const CartItem = ({item}) => {
    const { removeItem, setCartItems, setCartTotal, cartTotal, setCartCount, cartCount } = useContext(CartContext);
    const [itemQuantity, setItemQuantity] = useState(item.quantity);
    const decreaseCartQuantity = async () => {
        if(itemQuantity !== 1) {
            await updateCart({item:item.itemid,quantity:itemQuantity-1});
            setItemQuantity(itemQuantity-1);
            setCartTotal(cartTotal-item.price);
        }
        else {
            await removeItem({item:item.itemid});
            setCartTotal(cartTotal-item.price);
            console.log(cartCount);
            setCartCount(cartCount-1);
        }
    }
    const increaseCartQuantity = async () => {
        await updateCart({item:item.itemid,quantity:item.quantity+1});
        setItemQuantity(itemQuantity+1);
        setCartTotal(cartTotal+item.price);
    }
    return (
        <Flex key={item.itemid} gap="20px" padding="10px" whiteSpace="nowrap" position="relative">
            <Image src={item.primary_img ? item.primary_img : no_img} w="80px" h="80px" objectFit="contain"/>
            <Flex flexDir="column" gap="9px">
                <Text 
                fontWeight="600" 
                fontSize="1.0625rem" 
                maxW="210px"
                isTruncated
                _hover={
                    {
                        cursor: "pointer",
                        textDecorationLine: "underline"
                    }
                }
                >
                    {item.name}
                </Text>
                <Text fontWeight="400" fontSize="1.0625rem" > 
                    {item.price}
                </Text>
                <Flex
                gap={3}
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
                        cursor: "pointer"
                    }}
                    onClick={decreaseCartQuantity}
                    >
                        -
                    </Text>
                    <Text
                    fontSize="0.75rem"
                    fontWeight="600"
                    color="shieldtify.100"
                    >
                        {itemQuantity}
                    </Text>
                    <Text
                    fontSize="1.25rem"
                    fontWeight="300"
                    color="shieldtify.100"
                    _hover={{
                        cursor: "pointer"
                    }}
                    onClick={increaseCartQuantity}
                    >
                        +
                    </Text>
                </Flex>
            </Flex>
            <Image 
            position="absolute" 
            src={remove_item} 
            right="10%"
            top="35%"
            _hover={{
                cursor: "pointer"
            }}
            onClick={ async () => {
                removeItem({item:item.itemid});
                setItemQuantity(0);
                }
            }
            />
    </Flex>
    )
}

export default CartItem;