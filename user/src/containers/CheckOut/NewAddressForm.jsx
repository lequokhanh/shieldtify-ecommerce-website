import { 
    Flex,
    Heading,
    Input,
    FormControl,
    FormLabel,
    Checkbox,
    Button,
    FormErrorMessage, 
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik";
import { createAddress } from "../../utils/api";
import { useState } from "react";
import validator from 'validator'


const NewAddressForm = ({isOpen,pushAddress}) => {
    const [ isDefault, setIsDefault ] = useState(false);
    const handleCheckBoxChange = () => {
        setIsDefault(!isDefault);
    }
    return (
        <Flex 
        flexDir="column" 
        gap="5px" 
        fontFamily="Inter, sans-serif" 
        display={!isOpen && "none"}
        >
            <Heading
            color="shieldtify.200"
            fontSize="1.125rem"
            fontWeight="500"
            >
                Input your new address
            </Heading>       
            <Formik
            initialValues={{city: '', province: '', address: '', phone: ''}}
            onSubmit={async (values, actions) => {
                try{
                    const add = {
                        address: values.address,
                        city: values.city,
                        province: values.province,
                        phone_number: values.phone,
                        is_default: isDefault
                    }
                    await createAddress(add).then((res) => {
                        pushAddress(res.data.data);
                    })
                }catch(error){
                    console.log(error);
                }
            }}
            >
            {(props) => (
                <Form>
                    <Flex flexDir="column" gap="25px">
                        <Flex gap='16px'>
                                <Field name="city">
                                    {({field,form}) => (
                                        <FormControl isInvalid={form.errors.city && form.touched.city}>
                                            <FormLabel fontWeight="700" fontSize="0.875rem" color="#424856">City</FormLabel>
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
                                    {({field,form}) => (
                                        <FormControl isInvalid={form.errors.province && form.touched.province}>
                                            <FormLabel fontWeight="700" fontSize="0.875rem" color="#424856">Province</FormLabel>
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
                            {({field,form}) => (
                                <FormControl isInvalid={form.errors.address && form.touched.address}>
                                    <FormLabel fontWeight="700" fontSize="0.875rem" color="#424856">Address</FormLabel>
                                    <Input 
                                    {...field} 
                                    borderRadius="12px" 
                                    border="none"
                                    bgColor="#F3F4F6"
                                    />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="phone" validate={(value) => {
                            let error;
                            if(!validator.isMobilePhone(value)){
                                error= "Invalid Phone number"
                            }
                            return error;
                        }}>
                            {({field,form}) => (
                                <FormControl isInvalid={form.errors.phone && form.touched.phone}>
                                    <FormLabel fontWeight="700" fontSize="0.875rem" color="#424856">Phone</FormLabel>
                                    <Input 
                                    {...field} 
                                    borderRadius="12px" 
                                    border="none"
                                    bgColor="#F3F4F6"
                                    />
                                    <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
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
                        colorScheme='blackAlpha'
                        bgColor="#444444"
                        color="#FFFFFF"
                        type='submit'
                        borderRadius="10px"
                        px="35px"
                        fontWeight="600"
                        fontSize="0.875rem"
                        w='max-content'
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

export default NewAddressForm;