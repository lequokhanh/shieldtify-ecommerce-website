import { 
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Modal, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    Radio, 
    RadioGroup,
    useToast
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { UsersContext } from "../../context/users.context";
import { createStaffAccount } from "../../utils/api";

const CreateStaffModal = () => {
    const {isCreateOpen, setIsCreateOpen, staffs, setStaffs} = useContext(UsersContext);
    const toast = useToast();
    return (
        <Modal
        isOpen={isCreateOpen}
        blockScrollOnMount={'false'}
        onClose={() => setIsCreateOpen(false)}
        size={'lg'}
        >
            <ModalOverlay/>
            <ModalContent borderRadius={'10px'} top="100px">
                <ModalHeader
                bgColor={'#2D2D2D'}
                color={'white'}
                borderTopRadius={'10px'}
                >
                    Staff details
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
                fontFamily="Inter"
                padding="30px"
                >
                    <Formik
                    initialValues={{
                    username:  '',
                    displayname:  '',
                    role:'',
                    }}
                    onSubmit={async (values, actions) => {
                        if(values.displayname === ''){
                            actions.setFieldError('displayname', 'Please enter a display name');
                            return;
                        }
                        await createStaffAccount({
                            username: values.username,
                            display_name: values.displayname,
                            role: values.role
                        }).then((res) => {
                            toast({
                                title: "Staff account created successfully",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                            })
                            setStaffs([...staffs,res.data.data]);
                            setIsCreateOpen(false);
                        }).catch((err) => {
                            if(err.response.data.message === "Username is already taken"){
                                actions.setFieldError('username', err.response.data.message);
                            }
                            if(err.response.data.message === "Role is invalid"){
                                actions.setFieldError('role', err.response.data.message);
                            }
                        })
                        actions.setSubmitting(false);
                    }}
                    >
                        <Form>
                            <Flex flexDir="column" gap="25px">
                                <Field name="username">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.username && form.touched.username}>
                                            <FormLabel 
                                            fontWeight="700"
                                            fontSize="0.875rem"
                                            color="#424856"                                                
                                            >
                                                Username
                                            </FormLabel>
                                            <Input 
                                            {...field} 
                                            id="username" 
                                            placeholder="Username" 
                                            borderRadius="12px"
                                            border="none"
                                            bgColor="#F3F4F6"
                                            />
                                            <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="displayname">
                                    {({field, form}) => (
                                        <FormControl isInvalid={form.errors.displayname && form.touched.displayname}>
                                            <FormLabel 
                                            fontWeight="700"
                                            fontSize="0.875rem"
                                            color="#424856"                                                
                                            >
                                                Display name
                                            </FormLabel>
                                            <Input 
                                            {...field} 
                                            id="displayname" 
                                            placeholder="Display name" 
                                            borderRadius="12px"
                                            border="none"
                                            bgColor="#F3F4F6"
                                            />
                                            <FormErrorMessage>{form.errors.displayname}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="role" type="radio">
                                    {({field,form}) => (
                                        <FormControl isInvalid={form.errors.role && form.touched.role}>
                                            <FormLabel
                                            fontWeight="700"
                                            fontSize="0.875rem"
                                            color="#424856" 
                                            >
                                                Role
                                            </FormLabel>
                                            <RadioGroup>
                                                <HStack gap="33px" pl="10px">
                                                    <Radio 
                                                    {...field} 
                                                    value="staff"
                                                    colorScheme="blackAlpha"
                                                    borderColor="#D9D9D9"
                                                    box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                                                    >
                                                        Staff
                                                        </Radio>
                                                    <Radio 
                                                    {...field} 
                                                    value="admin"
                                                    colorScheme="blackAlpha"
                                                    borderColor="#D9D9D9"
                                                    box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                                                    >
                                                        Admin
                                                    </Radio>
                                                </HStack>
                                            </RadioGroup>
                                            <FormErrorMessage>{form.errors.role}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button 
                                borderRadius="25px" 
                                bg="shieldtify.100" 
                                color="#FFFFFF" 
                                fontWeight="600" 
                                colorScheme="blackAlpha" 
                                py="16px" 
                                type="submit" 
                                >
                                    Save
                                </Button>
                            </Flex>
                        </Form>
                    </Formik>
                </Flex>
            </ModalContent>
        </Modal>
    )
}

export default CreateStaffModal;