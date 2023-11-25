import { 
    Flex,
    Text,
    Button, 
    Input,
    FormControl,
    FormErrorMessage
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik";
import { applyDiscountCode } from "../../utils/api";
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";


const CartDiscount = () => {
    const { setCartItems, setCartTotal, setDiscountedPrice  } = useContext(CartContext);
    return (
    <Flex flexDir="column"
    padding="23px 29px" 
    fontFamily="Inter, sans-serif" 
    position="absolute" 
    bottom="2%" 
    left="-70%"
    bgColor="white"
    border="0.5px solid #444444"
    borderRadius="20px"
    gap="25px"
    >
        <Flex
        flexDir="column"
        gap="15px"
        >
            <Text fontSize="1.25rem" color="#444" fontWeight="700">
                Apply promotion code
            </Text>
            <Formik
            initialValues={{promotionCode: ''}}
            onSubmit={async (values, actions) => {
                try {
                    await applyDiscountCode(values.promotionCode).then((res) => {
                        setCartItems(res.data.data.cart);
                        setCartTotal(res.data.data.total);
                        setDiscountedPrice(res.data.data.discounted_price);
                    });
                }catch (err){
                    actions.setFieldError('promotionCode', err.response.data.message);
                }
            }}
            >
                {(props) => (
                    <Form>
                        <Flex flexDir="column" gap="30px">
                            <Field name="promotionCode">
                                {({field, form}) => (
                                        <FormControl isInvalid={form.errors.promotionCode && form.touched.promotionCode} isRequired>
                                            <Input
                                            {...field}
                                            id="promotionCode"
                                            placeholder="Enter a promotion code"
                                            pr="40px"
                                            />
                                            <FormErrorMessage>{form.errors.promotionCode}</FormErrorMessage>
                                        </FormControl>
                                )}
                            </Field>
                            <Button
                            fontFamily="Roboto, sans-serif"
                            textAlign="center"
                            colorScheme='blackAlpha'
                            isLoading={props.isSubmitting}
                            w="full"
                            bgColor="shieldtify.100"
                            color="#FFFFFF"
                            type='submit'
                            paddingX="60px"
                            borderRadius="20px"
                            fontWeight="600"
                            fontSize="0.875rem"
                            >
                                Apply
                            </Button>
                        </Flex>
                    </Form>
                )}

            </Formik>
        </Flex>
    </Flex>
    );
};

export default CartDiscount;
