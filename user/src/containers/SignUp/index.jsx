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
import ConfirmModal from '../../components/ConfirmModal';
import {Form, Field, Formik} from 'formik';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import * as router from "react-router-dom";
import { useState } from 'react';
import { sendEmail } from '../../utils/api';
import { checkExistedEmail } from '../../utils/api';
import validateEmail from '../../utils/validateEmail';
import validateToSendEmail from '../../utils/validateToSendEmail';

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box h="100vh">

      <Flex flexDir="column" justifyContent="center" mt="232px" mb="150px" borderRadius="15px" border="0.5px solid #444" padding="49px 65px">
        <Box>
          <Heading fontSize="28px" fontWeight="800" >Join Shieldtify now</Heading>
        </Box>
        <Box marginTop="17.5px" marginBottom="17.5px">
          <Divider/>
        </Box>
        <Box>
          <Formik
            initialValues={{ Email: '' }}
            onSubmit={ async (values, actions) => {
              try{
                await checkExistedEmail({
                  email: values.Email
                })  
              }catch(error){
                if(error.response && error.response.data && error.response.data.message==='Email existed'){
                  actions.setFieldError('Email', 'A user with this email address already exists');
                  return;                  
                }
              }
              if(validateToSendEmail(values.Email)){
                await sendEmail({
                  email: values.Email
                });
                openModal();
              }
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <Field name='Email' validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl  isInvalid={form.errors.Email && form.touched.Email} >
                      <FormLabel fontWeight="500">
                        Email
                      </FormLabel>
                      <Input border="1px solid rgba(68,68,68,0.8)" borderRadius="8px" {...field} placeholder='Email address *' />
                      <FormErrorMessage>{form.errors.Email}</FormErrorMessage>
                      <ConfirmModal email={form.values.Email} isOpen={isModalOpen} onClose={closeModal} type="register"/>
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
        <Box textAlign="center" bgColor="#E8E8E8" mt="15px" borderRadius="10px" padding="18px 57px">
          <Text fontSize="0.875rem" fontWeight="300">already join shieldtify?</Text>
          <Text 
          lineHeight="30px" 
          fontWeight="bold" 
          color='#000' 
          as={router.Link} 
          to="/sign-in" 
          _hover={
            {
              cursor: "pointer",
              textDecorationLine: "underline"
            }
          }>Log in now</Text>
        </Box>
      </Flex> 
    </Box>
  )
}

export default SignUp;