import {
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
} from '@chakra-ui/react'
import { NotAllowedIcon } from '@chakra-ui/icons'
import { useContext } from 'react'

import { Field, Form, Formik } from 'formik'
import { ProfileContext } from '../../context/profile.context'
import { updateProfile } from '../../utils/api'
const ProfileModal = ({ user }) => {
    const toast = useToast()
    const { isProfileOpen, setIsProfileOpen, setProfile } =
        useContext(ProfileContext)
    return (
        <Modal
            isOpen={isProfileOpen}
            blockScrollOnMount={'false'}
            onClose={() => {
                setIsProfileOpen(false)
            }}
            size={'xl'}
        >
            <ModalOverlay />
            <ModalContent borderRadius={'10px'}>
                <ModalHeader
                    bgColor={'#2D2D2D'}
                    color={'white'}
                    borderTopRadius={'10px'}
                >
                    Select saved address
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
                            username: user.username,
                            displayname: user.display_name,
                            email: user.email,
                        }}
                        onSubmit={async (values) => {
                            try {
                                await updateProfile({
                                    username: values.username,
                                    display_name: values.displayname,
                                }).then((res) => {
                                    setProfile(res.data.data)
                                    setIsProfileOpen(false)
                                    toast({
                                        title: 'Success',
                                        description: 'Profile updated',
                                        status: 'success',
                                        duration: 2000,
                                        isClosable: true,
                                    })
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
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Flex flexDir={'column'} gap="15px">
                                    <Field name="username">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.username &&
                                                    form.touched.username
                                                }
                                            >
                                                <FormLabel
                                                    fontWeight="700"
                                                    fontSize="0.875rem"
                                                    color="#424856"
                                                >
                                                    Username
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    borderRadius="12px"
                                                    border="none"
                                                    bgColor="#F3F4F6"
                                                    h={'50px'}
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="displayname">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.displayname &&
                                                    form.touched.displayname
                                                }
                                            >
                                                <FormLabel
                                                    fontWeight="700"
                                                    fontSize="0.875rem"
                                                    color="#424856"
                                                >
                                                    Display name
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
                                    <Field name="email">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.email &&
                                                    form.touched.email
                                                }
                                            >
                                                <FormLabel
                                                    fontWeight="700"
                                                    fontSize="0.875rem"
                                                    color="#424856"
                                                >
                                                    Email
                                                </FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        {...field}
                                                        borderRadius="12px"
                                                        border="none"
                                                        bgColor="#F3F4F6"
                                                        color={'#9095A1'}
                                                        isReadOnly
                                                    />
                                                    <InputRightElement>
                                                        <NotAllowedIcon />
                                                    </InputRightElement>
                                                </InputGroup>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Button
                                        colorScheme="blackAlpha"
                                        marginTop={'30px'}
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
                                        Save
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

export default ProfileModal
