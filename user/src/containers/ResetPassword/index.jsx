import {Form, Field, Formik} from 'formik';
import * as router from "react-router-dom";
import validateEmail from '../../utils/validateEmail';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Image, Flex, FormControl, FormLabel, Input, Box, Heading, Divider, Button, FormErrorMessage } from '@chakra-ui/react';
import backArrow from "../../assets/BackArrow.svg"
import { useState } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import { sendEmailResetPassword, checkExistedEmail } from '../../utils/api';

const ResetPassword = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };  
    return (
    <Box h="100vh">

        <Flex 
        flexDir="column" 
        mt="257px"  
        mb="50px"
        borderRadius="15px" 
        border="0.5px solid #444" 
        padding="53px 65px" 
        textAlign="center"
        position="relative"
        >
            <Box 
            position="absolute" 
            left="10px" 
            top="15px" 
            as={router.Link} 
            to="/sign-in" 
            _hover={{
                cursor: "pointer"
            }}
            >
                <Image src={backArrow}/>
            </Box>
            <Box>
                <Heading fontSize="1.75rem" fontWeight="800" color="shieldtify.100">
                    Reset password
                </Heading>
            </Box>
            <Box marginTop="18.5px" marginBottom="18.5px">
                <Divider/>
            </Box>          
            <Box>
                <Formik
                initialValues={{Email: ""}}
                onSubmit={ async (values, actions) => {
                    try{
                        await sendEmailResetPassword(values.Email)
                        await checkExistedEmail(values.Email).then(() => {
                            actions.setFieldError('Email', 'No user with this email address exists');
                            return;
                        })
                        openModal();    
                    }catch(e){
                        actions.setFieldError('Email', e.response.data.message);
                    }
                    actions.setSubmitting(false);                        
                }}
                >
                    {(props) => (
                        <Form>
                            <Field name="Email" validate={validateEmail}>
                                {({field, form}) => (
                                    <FormControl isInvalid={ form.errors.Email && form.touched.Email }>
                                        <FormLabel fontWeight="500">
                                            Email
                                        </FormLabel>       
                                        <Input
                                        border="1px solid rgba(68,68,68,0.8)" 
                                        borderRadius="8px" {...field} 
                                        placeholder='Email adddress'
                                        />                 
                                        <FormErrorMessage>{form.errors.Email}</FormErrorMessage>
                                        <ConfirmModal email={form.values.Email} isOpen={isModalOpen} onClose={closeModal} type="reset"/>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                            mt='37px'
                            colorScheme='blackAlpha'
                            bgColor="#2D2D2D"
                            color="#FFFFFF"
                            isLoading={props.isSubmitting}
                            type='submit'
                            w="full"
                            borderRadius="20px"
                            fontWeight="600"
                            fontSize="0.875rem"
                            >
                            Continue
                            <ArrowForwardIcon/>
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Flex>
    </Box>
    )
}

export default ResetPassword;