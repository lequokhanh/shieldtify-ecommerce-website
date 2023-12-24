import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import { Formik, Form, Field } from "formik";
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { updatePassword } from "../../utils/api";


const ChangePasswordModal = ({isOpen, onClose}) => {
    const toast = useToast();
    return(
        <Modal
        blockScrollOnMount={'false'}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        >
            <ModalOverlay/>
            <ModalContent borderRadius={'10px'} top="100px">
                <ModalHeader
                bgColor={'#2D2D2D'}
                color={'white'}
                borderTopRadius={'10px'}
                >
                    Change Password
                </ModalHeader>
                <ModalCloseButton
                bgColor={'white'}
                borderRadius={'50%'}
                size={'sm'}
                mt={'10px'}
                mr={'10px'}
                />
                <Box
                fontFamily="Inter"
                padding="30px"
                >
                    <Formik
                    initialValues={{
                        old_password: "",
                        new_password: "",
                        confirm_password: "",
                    }}
                    onSubmit={async (values,actions) => {
                        try{
                            await updatePassword({
                                old_password: values.old_password,
                                new_password: values.new_password,
                            }).then(() => {
                                onClose();
                                toast({
                                    title: "Password updated",
                                    description: "Your password has been updated",
                                    status: "success",
                                    duration: 9000,
                                    isClosable: true,
                                })
                            })
                        }catch(e){
                            if(e.response.data.message === "Old password is incorrect"){
                                actions.setFieldError('old_password', 'Old password is incorrect')
                            }
                        }
                        actions.setSubmitting(false);
                    }}
                    >
                        {({values}) => {
                            function checkPwdMatching(value){
                                let error;
                                if(value !== values.new_password){
                                    error = 'Password does not match';
                                }
                                return error; 
                            }         
                            return (
                                <Form>
                                    <Flex flexDir="column" gap="25px">
                                        <Field name="old_password" type="password">
                                            {({field,form}) => (
                                                <FormControl isInvalid={form.errors.old_password && form.touched.old_password}>
                                                    <FormLabel
                                                    fontWeight="700"
                                                    fontSize="0.875rem"
                                                    color="#424856"                                                
                                                    >
                                                        Current Password
                                                    </FormLabel>
                                                    <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="Current password"
                                                    border="1px solid rgba(68,68,68,0.8)"
                                                    borderRadius="8px"
                                                    />
                                                    <FormErrorMessage>{form.errors.old_password}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="new_password" type="password">
                                            {({field,form}) => (
                                                <FormControl isInvalid={form.errors.new_password && form.touched.new_password}>
                                                    <FormLabel
                                                    fontWeight="700"
                                                    fontSize="0.875rem"
                                                    color="#424856"                                                
                                                    >
                                                        New Password
                                                    </FormLabel>
                                                    <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="New password"
                                                    border="1px solid rgba(68,68,68,0.8)"
                                                    borderRadius="8px"
                                                    />
                                                    <FormErrorMessage>{form.errors.new_password}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="confirm_password" type="password" validate={checkPwdMatching}>
                                            {({field,form}) => (
                                                <FormControl isInvalid={form.errors.confirm_password && form.touched.confirm_password}>
                                                    <FormLabel
                                                    fontWeight="700"
                                                    fontSize="0.875rem"
                                                    color="#424856"                                                
                                                    >
                                                        Confirm Password
                                                    </FormLabel>
                                                    <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="Confirm password"
                                                    border="1px solid rgba(68,68,68,0.8)"
                                                    borderRadius="8px"
                                                    />
                                                    <FormErrorMessage>{form.errors.confirm_password}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Button
                                        mt='37px'
                                        colorScheme='blackAlpha'
                                        bgColor="#2D2D2D"
                                        color="#FFFFFF"
                                        type='submit'
                                        w="full"
                                        borderRadius="20px"
                                        fontWeight="600"
                                        fontSize="0.875rem"
                                        >
                                            Continue 
                                            <ArrowForwardIcon/>
                                        </Button>
                                    </Flex>
                                </Form>
                            )                   
                        }}
                    </Formik>
                </Box>
            </ModalContent>
        </Modal>
    )
}

export default ChangePasswordModal;