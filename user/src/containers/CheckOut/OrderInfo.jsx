import {
    HStack,
    Flex,
    Image,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Divider,
    useDisclosure,
    FormErrorMessage
} from '@chakra-ui/react';
import money_blue from '../../assets/Checkout/money_blue.svg';
import bill from '../../assets/Checkout/bill.svg';
import { Field, Form, Formik } from 'formik';
import { useState, useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckOutConfirmModal from '../../components/CheckOutConfirmModal';
import CodeCard from '../../components/CodeCard';
import { applyDiscountCode } from '../../utils/api';

const OrderInfo = () => {
    const { cartTotal, discountedPrice, discountedCode, setDiscountedCode, setCartItems, setCartTotal, setDiscountedPrice } = useContext(CartContext);
    const [voucherCode, setVoucherCode] = useState(""); // [1
    const { isOpen, onClose, onOpen } = useDisclosure();
    return(
    <Flex
    flexDir="column"
    padding="30px 28px 21px"
    bgColor="rgba(222, 225, 230, 0.50)"
    borderRadius="12px"
    w="340px"
    mt="56px"
    >
        <HStack
        gap="8px"
        mb="22px"
        >
            <Image src={money_blue} w="24px" h="24px"/>
            <Text
            fontSize="1.125rem"
            fontWeight="700"
            color="shieldtify.checkout"
            >
                Order information
            </Text>
        </HStack>
        <Flex flexDir="column">
            {
                discountedCode !== "" 
                ?
                (
                    <CodeCard code={{
                        discount: "PROMO15OFF",
                        description: "Lorem ipsum dolor sit amet, consectet sed do eiusmod tempoaaaut la lorem ipasfkjasiofjasiofjioasfjioasfjioasfjioasjiofsjioasjasiofjasoifjasiofjasoifjasofjioasfjioasjiofasiojfasjiof"
                    }}/>
                )
                :
                (
                <Formik 
                initialValues={{code: ""}}
                onSubmit={ async (values,actions) => {
                    try {
                        
                        await applyDiscountCode(voucherCode).then((res) => {
                            setCartItems(res.data.data.cart);
                            setCartTotal(res.data.data.total);
                            setDiscountedPrice(res.data.data.discount);
                            setDiscountedCode(voucherCode);
                        });
                    }catch (err){
                        actions.setFieldError('code', err.response.data.message);
                    }
                    actions.setSubmitting(false);
                }}
                >
                    {(props) => (
                        <Form>
                            <Flex flexDir="column" gap="15px">
                                <Field name="code">
                                    {({field,form}) => (
                                        <FormControl isInvalid={form.errors.code && form.touched.code}>
                                            <FormLabel fontWeight="700" fontSize="0.875rem" color="shieldtify.checkout">Voucher</FormLabel>
                                            <Flex fontFamily="Inter, sans-serif" gap="8px">
                                                <Input 
                                                {...field} 
                                                borderRadius="12px" 
                                                border="1px solid #9095A1"
                                                bgColor="#FFFFFF"
                                                value={voucherCode}
                                                onChange={(e) => {
                                                    setVoucherCode(e.target.value);
                                                }}
                                                />
                                                <Button
                                                colorScheme="facebook"
                                                color="#FFFFFF"
                                                type="submit"
                                                borderRadius="12px"
                                                isLoading={props.isSubmitting}
                                                fontWeight="400"
                                                fontSize="0.875rem"
                                                >
                                                    Apply
                                                </Button>
                                            </Flex>
                                            <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Flex>
                        </Form>
                    )}
                </Formik>
                )
            }
            <Flex
            flexDir="column"
            mt="22px"
            gap="10px"
            >
                <HStack gap="8px">
                    <Image src={bill} alt="bill" w="24px" h="24px"/>
                    <Text
                    color="shieldtify.checkout"
                    fontSize="1.125rem"
                    fontWeight="700"
                    >
                        Summary
                    </Text>
                </HStack>
                <Flex
                fontFamily="Inter, sans-serif"
                justifyContent="space-between"
                flexDir="column"
                gap='10px'
                >
                    <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    >
                        <Text
                        color="shieldtify.checkout"
                        fontWeight="400"
                        fontSize="0.75rem"
                        alignItems="center"
                        >
                            Subtotal
                        </Text>
                        <Text
                        color="shieldtify.checkout"
                        fontWeight="700"
                        fontSize="0.875rem"
                        >
                        {
                            cartTotal + discountedPrice
                        }$
                        </Text>
                    </HStack>
                    <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    >
                        <Text
                        color="shieldtify.checkout"
                        fontWeight="400"
                        fontSize="0.75rem"                        
                        >
                            Discount
                        </Text>

                        <Text
                        color="shieldtify.checkout"
                        fontWeight="700"
                        fontSize="0.875rem"                        
                        >
                            {discountedPrice === 0 ? `${discountedPrice}$` : `-${discountedPrice}$`}
                        </Text>
                    </HStack>
                    <Divider borderColor="#DEE1E6"/>
                    <Flex
                    justifyContent="space-between"
                    fontFamily="Inter, sans-serif"
                    alignItems="center"
                    >
                        <Text
                        fontSize="0.75rem"
                        fontWeight="700"
                        color="shieldtify.checkout"
                        >
                            Total
                        </Text>
                        <Text
                        fontSize="1.125rem"
                        fontWeight="700"
                        color="shieldtify.checkout"                    
                        >
                            {cartTotal}$
                        </Text>
                    </Flex>
                </Flex>
                <HStack  justifyContent="center">
                    <Button
                    bgColor="#444444"
                    color="#FFFFFF"
                    w="max-content"
                    fontSize="1rem"
                    fontWeight="400"
                    fontFamily="Inter, sans-serif"
                    borderRadius="10px"
                    padding="10px 80px"
                    onClick={onOpen}
                    >
                        Complete order
                    </Button>
                </HStack>
                <CheckOutConfirmModal isOpen={isOpen} onClose={onClose}/>
            </Flex>
        </Flex>
    </Flex>
    )
};

export default OrderInfo;