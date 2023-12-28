import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Button,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import {  useState, useEffect } from 'react'
import { createAddress, updateAddress } from '../../utils/api'

const AddressModal = ({ isOpen, onClose, address, addresses, setAddresses, userID }) => {
    const toast = useToast()
    const [isDefault, setIsDefault] = useState(
        address ? address.is_default : false
    )
    useEffect(() => {
        setIsDefault(address ? address.is_default : false)
    }, [address])
    return (
        <Modal
            isOpen={isOpen}
            blockScrollOnMount={'false'}
            onClose={onClose}
            size={'4xl'}
        >
            <ModalOverlay />
            <ModalContent borderRadius={'10px'}>
                <ModalHeader
                    bgColor={'#2D2D2D'}
                    color={'white'}
                    borderTopRadius={'10px'}
                >
                    Address Details
                </ModalHeader>
                <ModalCloseButton
                    bgColor={'white'}
                    borderRadius={'50%'}
                    size={'sm'}
                    mt={'10px'}
                    mr={'10px'}
                />
                <Flex
                    flexDir="column"
                    fontFamily="Inter, sans-serif"
                    padding={'30px'}
                >
                    <Formik
                        initialValues={{
                            city: (address && address.city) || '',
                            province: (address && address.province) || '',
                            address: (address && address.address) || '',
                            phone: (address && address.phone_number) || '',
                        }}
                        onSubmit={async (values, actions) => {
                            try {
                                let add = {
                                    address: values.address,
                                    city: values.city,
                                    province: values.province,
                                    phone_number: values.phone,
                                    is_default: isDefault,
                                }
                                if (!address) {
                                    await createAddress(add).then((res) => {
                                        const result = res.data.data
                                        if (result.is_default)
                                            addresses.map((add) => {
                                                add.is_default = false
                                            })
                                        setAddresses([...addresses, result])
                                        actions.resetForm()
                                        toast({
                                            title: 'Success',
                                            description:
                                                'Create address successfully',
                                            status: 'success',
                                            duration: 2000,
                                            isClosable: true,
                                        })
                                    })
                                } else {
                                    add = { ...add, uid: address.uid }
                                    await updateAddress({add,userID}).then((res) => {
                                        const result = res.data.data
                                        const temp = []
                                        for (add of addresses) {
                                            if (add.uid === address.uid)
                                                temp.push(result)
                                            else if (result.is_default) {
                                                add.is_default = false
                                                temp.push(add)
                                            } else temp.push(add)
                                        }
                                        setAddresses(temp)
                                        toast({
                                            title: 'Success',
                                            description:
                                                'Update address successfully',
                                            status: 'success',
                                            duration: 2000,
                                            isClosable: true,
                                        })
                                    })
                                }
                                onClose()
                            } catch (error) {
                                toast({
                                    title: 'Error',
                                    description: error.response.data.message,
                                    status: 'error',
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
                                                            e.target.value ===
                                                                '' ||
                                                            re.test(
                                                                e.target.value
                                                            )
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
                                        onChange={() => {
                                            setIsDefault(!isDefault)
                                        }}
                                    >
                                        Save as default
                                    </Checkbox>
                                    <Button
                                        colorScheme="blackAlpha"
                                        bgColor="#444444"
                                        color="#FFFFFF"
                                        type="submit"
                                        borderRadius="25px"
                                        fontWeight="600"
                                        fontSize="1rem"
                                        isLoading={props.isSubmitting}
                                        alignSelf={'center'}
                                        padding={'24px 190px'}
                                        w={'100%'}
                                    >
                                        {address ? 'Save' : 'Create address'}
                                    </Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Flex>
            </ModalContent>
        </Modal>
    )
}

export default AddressModal
