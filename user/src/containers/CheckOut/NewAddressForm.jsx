import {
    Flex,
    Heading,
    Input,
    FormControl,
    FormLabel,
    Checkbox,
    Button,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { createAddress } from '../../utils/api'
import { useState } from 'react'

const NewAddressForm = ({ isOpen, pushAddress, setIsCreateAddressOpen }) => {
    const toast = useToast()
    const [isDefault, setIsDefault] = useState(false)
    const handleCheckBoxChange = () => {
        setIsDefault(!isDefault)
    }
    return (
        <Flex
            flexDir="column"
            fontFamily="Inter, sans-serif"
            display={!isOpen && 'none'}
        >
            <Heading
                color="shieldtify.200"
                fontSize="1.125rem"
                fontWeight="500"
                mb="20px"
            >
                Input your new address
            </Heading>
            <Formik
                initialValues={{
                    city: '',
                    province: '',
                    address: '',
                    phone: '',
                }}
                onSubmit={async (values, actions) => {
                    try {
                        const add = {
                            address: values.address,
                            city: values.city,
                            province: values.province,
                            phone_number: values.phone,
                            is_default: isDefault,
                        }
                        await createAddress(add).then((res) => {
                            pushAddress({
                                value: res.data.data,
                                setIsCreateAddressOpen: setIsCreateAddressOpen,
                            })
                            actions.resetForm()
                        })
                    } catch (error) {
                        toast({
                            title: 'Error',
                            description: error.response.data.message,
                            status: 'Error',
                            duration: 2000,
                            isClosable: true,
                        })
                    }
                    actions.setSubmitting(false)
                }}
            >
                {(props) => (
                    <Form>
                        <Flex flexDir="column" gap="25px">
                            <Flex gap="16px">
                                <Field name="city">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.city &&
                                                form.touched.city
                                            }
                                        >
                                            <FormLabel
                                                fontWeight="700"
                                                fontSize="0.875rem"
                                                color="#424856"
                                            >
                                                City
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                borderRadius="12px"
                                                border="none"
                                                bgColor="#F3F4F6"
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="province">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.province &&
                                                form.touched.province
                                            }
                                        >
                                            <FormLabel
                                                fontWeight="700"
                                                fontSize="0.875rem"
                                                color="#424856"
                                            >
                                                Province
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                borderRadius="12px"
                                                border="none"
                                                bgColor="#F3F4F6"
                                            />
                                        </FormControl>
                                    )}
                                </Field>
                            </Flex>
                            <Field name="address">
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.address &&
                                            form.touched.address
                                        }
                                    >
                                        <FormLabel
                                            fontWeight="700"
                                            fontSize="0.875rem"
                                            color="#424856"
                                        >
                                            Address
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            borderRadius="12px"
                                            border="none"
                                            bgColor="#F3F4F6"
                                        />
                                    </FormControl>
                                )}
                            </Field>
                            <Field
                                name="phone"
                                validate={(value) => {
                                    let error
                                    if (!/^\d{10}$/.test(value)) {
                                        error = 'Invalid Phone number'
                                    }
                                    return error
                                }}
                            >
                                {({ field, form }) => (
                                    <FormControl
                                        isInvalid={
                                            form.errors.phone &&
                                            form.touched.phone
                                        }
                                    >
                                        <FormLabel
                                            fontWeight="700"
                                            fontSize="0.875rem"
                                            color="#424856"
                                        >
                                            Phone
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            type="tel"
                                            inputMode="numeric"
                                            maxLength={10}
                                            borderRadius="12px"
                                            border="none"
                                            bgColor="#F3F4F6"
                                            onChange={(e) => {
                                                const re = /^[0-9\b]+$/
                                                if (
                                                    e.target.value === '' ||
                                                    re.test(e.target.value)
                                                ) {
                                                    field.onChange(e)
                                                }
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {form.errors.phone}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Checkbox
                                colorScheme="blackAlpha"
                                borderColor="#D9D9D9"
                                box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                                borderRadius="4px"
                                fontSize="0.9375rem"
                                isChecked={isDefault}
                                onChange={handleCheckBoxChange}
                            >
                                Save as default
                            </Checkbox>
                            <Button
                                colorScheme="blackAlpha"
                                bgColor="#444444"
                                color="#FFFFFF"
                                type="submit"
                                borderRadius="10px"
                                px="35px"
                                fontWeight="600"
                                fontSize="0.875rem"
                                w="max-content"
                                isLoading={props.isSubmitting}
                            >
                                Create address
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Flex>
    )
}

export default NewAddressForm
