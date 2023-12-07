import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Flex,
    Button,
    Divider,
    Heading,
    Box,
    Text,
} from '@chakra-ui/react'
import { Form, Field, Formik } from 'formik'
import * as router from 'react-router-dom'
import { login } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context'
import { CartContext } from '../../context/cart.context'
import { getUserCart } from '../../utils/api'

const SignIn = () => {
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    const { setCartItems, setCartCount, setCartTotal, setOutOfStockItems } =
        useContext(CartContext)
    useEffect(() => {
        if (isLoggedIn) navigate('/home')
    }, [])
    return (
        <Box h="100vh">
            <Flex
                border="0.5px solid #444"
                borderRadius="15px"
                justifyContent="center"
                mt="150px"
                mb="300px"
                flexDir="column"
                textAlign="center"
                padding="42px 65px"
            >
                <Box>
                    <Heading>Log in</Heading>
                </Box>
                <Box marginTop="35px" marginBottom="35px">
                    <Divider />
                </Box>
                <Box>
                    <Formik
                        initialValues={{ loginCred: '', password: '' }}
                        onSubmit={async (values, actions) => {
                            try {
                                await login({
                                    loginCred: values.loginCred,
                                    password: values.password,
                                })

                                setIsLoggedIn(true)
                                navigate('/home')

                                const userCartResponse = await getUserCart()
                                setCartItems(userCartResponse.data.data.cart)
                                setCartCount(
                                    userCartResponse.data.data.cart.length +
                                        userCartResponse.data.data.out_of_stock
                                            .length
                                )
                                setCartTotal(userCartResponse.data.data.total)
                                setOutOfStockItems(
                                    userCartResponse.data.data.out_of_stock
                                )
                            } catch (error) {
                                actions.setFieldError(
                                    'loginCred',
                                    error.response.data.message
                                )
                            }
                            actions.setSubmitting(false)
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Flex
                                    flexDir="column"
                                    gap="25px"
                                    fontSize="0.875rem"
                                >
                                    <Field name="loginCred">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.loginCred &&
                                                    form.touched.loginCred
                                                }
                                                isRequired
                                            >
                                                <Flex
                                                    flexDir="column"
                                                    gap="10px"
                                                >
                                                    <FormLabel margin="0">
                                                        Email or username
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        id="loginCred"
                                                        placeholder="Email address / username *"
                                                        fontSize="0.75rem"
                                                        borderRadius="8px"
                                                        border="1px solid rgba(68, 68, 68, 0.8)"
                                                        padding="13px 0px 13px 18px"
                                                        marginRight="83px"
                                                        fontWeight="500"
                                                    />
                                                    <FormErrorMessage>
                                                        {form.errors.loginCred}
                                                    </FormErrorMessage>
                                                </Flex>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.password &&
                                                    form.touched.password
                                                }
                                                isRequired
                                            >
                                                <Flex
                                                    flexDir="column"
                                                    gap="10px"
                                                >
                                                    <FormLabel margin="0">
                                                        Password
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        id="password"
                                                        type="password"
                                                        placeholder="Password"
                                                        fontSize="0.75rem"
                                                        borderRadius="8px"
                                                        border="1px solid rgba(68, 68, 68, 0.8)"
                                                        padding="13px 0px 13px 18px"
                                                        marginRight="83px"
                                                        fontWeight="500"
                                                    />
                                                    <FormErrorMessage>
                                                        {form.errors.password}
                                                    </FormErrorMessage>
                                                    <Text
                                                        color="valid.blue.normal"
                                                        fontSize="0.725rem"
                                                        fontWeight="700"
                                                        textAlign="right"
                                                        as={router.Link}
                                                        to="/reset-password"
                                                        _hover={{
                                                            textDecoration:
                                                                'underline',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        Forgot password?
                                                    </Text>
                                                </Flex>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Flex flexDir="column" gap="15px">
                                        <Button
                                            colorScheme="blackAlpha"
                                            bgColor="#2D2D2D"
                                            color="#FFFFFF"
                                            type="submit"
                                            borderRadius="20px"
                                            fontWeight="600"
                                            fontSize="0.875rem"
                                            isLoading={props.isSubmitting}
                                        >
                                            Login
                                        </Button>
                                        <Box
                                            alignItems="center"
                                            textAlign="center"
                                            bgColor="#E8E8E8"
                                            borderRadius="10px"
                                            padding="18px 57px"
                                        >
                                            <Text
                                                fontSize="0.875rem"
                                                fontWeight="300"
                                            >
                                                New to Shieldtify?
                                            </Text>
                                            <Text
                                                lineHeight="30px"
                                                fontWeight="bold"
                                                color="#000"
                                                as={router.Link}
                                                to="/sign-up"
                                                _hover={{
                                                    cursor: 'pointer',
                                                    textDecorationLine:
                                                        'underline',
                                                }}
                                            >
                                                Join with us now
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Flex>
        </Box>
    )
}

export default SignIn
