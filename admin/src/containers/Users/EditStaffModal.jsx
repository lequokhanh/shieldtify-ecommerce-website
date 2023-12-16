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
    RadioGroup
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { UsersContext } from "../../context/users.context";
import { updateStaffAcount } from "../../utils/api";

const EditStaffModal = ({staff}) => {
    console.log(staff);
    const {isEditOpen, setIsEditOpen,resetStaffPwd} = useContext(UsersContext);
    return (
        <Modal
        isOpen={isEditOpen}
        blockScrollOnMount={'false'}
        onClose={() => setIsEditOpen(false)}
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
                    username: staff && staff.username || '',
                    displayname: staff && staff.display_name || '',
                    role: staff && staff.role || '' ,
                    }}
                    onSubmit={async (values, actions) => {
                        await updateStaffAcount({
                            id: staff.uid,
                            username: values.username,
                            display_name: values.displayname,
                            role: staff.role
                        }).catch(err => {
                            actions.setFieldError('username', err.response.data.message);
                        })
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
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="role" type="radio">
                                    {({field}) => (
                                        <FormControl>
                                            <FormLabel
                                            fontWeight="700"
                                            fontSize="0.875rem"
                                            color="#424856" 
                                            >
                                                Role
                                            </FormLabel>
                                            <RadioGroup 
                                            defaultValue={staff.role}
                                            >
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
                                        </FormControl>
                                    )}
                                </Field>
                                <Button 
                                borderRadius="25px" 
                                bg="shieldtify.200" 
                                color="#FFFFFF" 
                                fontWeight="600" 
                                colorScheme="facebook" 
                                py="16px"
                                onClick={() => resetStaffPwd(staff.id)}
                                >
                                    Reset password
                                </Button>
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

export default EditStaffModal;