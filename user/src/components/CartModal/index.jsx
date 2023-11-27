import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Flex,
    Heading,
    Divider,
    HStack,
    Text,
    Button,
    Image,
    Box,
} from '@chakra-ui/react';
import { useState, useContext} from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import CartItem from './CartItem';
import discount from "../../assets/Cart/discount.svg";
import CartDiscount from './CartDiscount';
import { CartContext } from '../../context/cart.context';

const CartModal = ({isOpen, onClose}) => {
    const [isDiscountOpen, setIsDiscountOpen] = useState(false);
    const [discountTextStyle, setDisCountTextStyle] = useState({});
    const { cartItems, cartTotal, clearCart, outOfStockItems, discountedPrice, discountedCode } = useContext(CartContext);
    const handleOpenDiscount = () => {
        setIsDiscountOpen(!isDiscountOpen);
        isDiscountOpen ? setDisCountTextStyle({
            textDecorationLine: "none"
        }) : setDisCountTextStyle({
            textDecorationLine: "underline"
        });
    }
    return(
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount="true"
        motionPreset="slideInTop"
        size="lg"
        >
            <ModalOverlay/>
            <ModalContent     
            position="absolute"
            right="1%"
            top="-3%"
            bottom="-6%"
            borderRadius="15px"
            fontFamily="Inter, sans-serif"
            padding="30px 50px"
            >
                <ModalCloseButton variant="custom" />
                <Flex flexDir="column" fontFamily="Inter, sans-serif" alignItems="center" justifyContent="center" gap="10px">
                    <Flex flexDir="column" alignItems="center" w="full">
                        <Heading color="shieldtify.100" fontSize="2.25rem" fontWeight="700" textAlign="center">
                            Cart
                        </Heading>
                        <Text alignSelf="flex-end"
                        _hover={{
                            cursor: "pointer",
                            textDecorationLine: "underline"
                        }}
                        onClick={clearCart}
                        >
                            Clear all
                        </Text>
                    </Flex>
                    <Flex
                    flexDir="column"
                    minW="400px"
                    gap="22px"
                    >
                        <Divider
                        borderColor="#3C619E"  
                        borderWidth="1px"
                        />              
                        <Flex flexDir="column" maxH="59vh" gap="18px" overflowY="auto"
                        > 
                        {
                            outOfStockItems.map((item) => (
                                <CartItem key={item.itemid} item={item} type="outOfStock"/>
                            ))
                        }
                        {
                            cartItems.map((item) => (
                                    <CartItem key={item.itemid} item={item} type="stock"/>
                            ))
                        }
                        </Flex>
                    </Flex>
                    <Flex position="absolute" bottom="2%" flexDir="column">
                        
                        <Divider 
                        mb="22px"                        
                        borderColor="#3C619E"  
                        borderWidth="1px"/>  
                        <Flex gap="10px" flexDir="column" minW="400px" paddingX="40px">
                            <HStack color="shieldtify.100" justifyContent="space-between">
                                <Text fontWeight="500">
                                    Subtotal
                                </Text>
                                <Text fontSize="0.875rem" fontWeight="400">
                                {
                                    cartTotal + discountedPrice
                                }
                                $
                                </Text>
                            </HStack>
                            <HStack color="shieldtify.100" justifyContent="space-between" position="relative">
                                <Flex 
                                position="relative" 
                                left="-2.5px"
                                _hover={{
                                    cursor: "pointer",
                                    textDecorationLine: "underline"
                                }}
                                onClick={handleOpenDiscount}
                                >
                                    <Image 
                                    src={discount} 
                                    alt="discount" 
                                    position="absolute" 
                                    bottom="2" 
                                    left="-4"
                                    transform={
                                        isDiscountOpen ? "rotate(0deg)" : "rotate(180deg)"
                                    }
                                    />
                                    <Text 
                                    fontWeight="500" 
                                    style={discountTextStyle}
                                    >
                                        Discount
                                    </Text>
                                </Flex>
                                    <Flex gap="5px">
                                        <Text
                                            color="#9095A1"
                                            fontSize="0.875rem"
                                            fontWeight="600"
                                            textDecorationLine="underline"
                                        >
                                            {discountedCode.toUpperCase()}
                                        </Text>
                                        <Text fontSize="0.875rem" fontWeight="400">
                                            {discountedPrice === 0 ? `${discountedPrice}$` : `-${discountedPrice}$`}
                                        </Text>
                                    </Flex>
                                </HStack>
                                <HStack color="shieldtify.100" justifyContent="space-between">
                                    <Box 
                                    position="relative"
                                    left="16.5px"
                                    >
                                        <Text 
                                        fontSize="1.25rem" 
                                        fontWeight="700" 
                                        color="#3C619E" 
                                        >
                                            Total
                                        </Text>
                                    </Box>
                                    <Text fontSize="1.25rem" fontWeight="400">
                                    {cartTotal}$
                                    </Text>
                                </HStack>
                            </Flex>
                            <Button
                                colorScheme='blackAlpha'
                                bgColor="shieldtify.200"
                                color="#FFFFFF"
                                type='submit'
                                w="full"
                                paddingX="60px"
                                borderRadius="20px"
                                fontWeight="600"
                                fontSize="0.875rem"     
                                mt="22px"
                                >
                                    Confirm order
                                <ArrowForwardIcon/>
                            </Button>
                    </Flex>
                </Flex>
                {
                    isDiscountOpen && <CartDiscount/>
                }
            </ModalContent>
        </Modal>
    )
}

export default CartModal;