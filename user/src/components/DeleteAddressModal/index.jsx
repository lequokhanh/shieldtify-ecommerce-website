import {
    Modal,
    ModalOverlay,
    ModalContent,
    VStack,
    Text,
    Image,
    Heading,
    HStack,
    Button,
    useToast,
} from '@chakra-ui/react'
import * as router from 'react-router-dom'
import check from '../../assets/CheckOut/check.svg'
import { deleteAddress } from '../../utils/api'
import { useContext, useEffect } from 'react'
import { ProfileContext } from '../../context/profile.context'
const DeleteAddressModal = ({ isOpen, onClose, address }) => {
    const toast = useToast()
    const { addresses, setAddresses } = useContext(ProfileContext)
    useEffect(() => {}, [address])
    return (
        <Modal
            blockScrollOnMount={'false'}
            isOpen={isOpen}
            onClose={() => {
                onClose(false)
            }}
            size={'md'}
        >
            <ModalOverlay />
            <ModalContent
                padding="20px 50px"
                border="1px solid #BDC1CA"
                borderRadius="18px"
                position="absolute"
                top="200px"
            >
                <VStack gap="15px">
                    <Image
                        src={check}
                        alt="Check"
                        borderRadius="100vh"
                        padding="10px 10px"
                        bgColor="#F6F6F6"
                        // border="1px solid #F6F6F6"
                    />
                    <Heading
                        color="shieldtify.checkout"
                        fontSize="1.5rem"
                        fontWeight="700"
                        lineHeight="36px"
                    >
                        Confirm action
                    </Heading>
                    <Text
                        fontFamily="Inter, sans-serif"
                        fontWeight="400"
                        lineHeight="normal"
                    >
                        This action will delete your saved address, please check
                        your action carefully.
                    </Text>
                    <HStack mt="25px" gap="43px" fontFamily="Inter, sans-serif">
                        <Button
                            colorScheme="gray"
                            color="#FF6262"
                            bgColor="#FFF0F0"
                            fontWeight="400"
                            borderRadius="12px"
                            onClick={() => {
                                onClose(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blackAlpha"
                            color="#FFFFFF"
                            bgColor="#444444"
                            borderRadius="12px"
                            fontWeight="400"
                            as={router.Link}
                            onClick={async () => {
                                await deleteAddress(address.uid)
                                    .then(() => {
                                        setAddresses(
                                            addresses.filter(
                                                (add) => add.uid !== address.uid
                                            )
                                        )
                                        onClose()
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        toast({
                                            title: err.response.data.message,
                                            status: 'error',
                                            duration: 3000,
                                            isClosable: true,
                                        })
                                    })
                            }}
                        >
                            Confirm
                        </Button>
                    </HStack>
                </VStack>
            </ModalContent>
        </Modal>
    )
}

export default DeleteAddressModal
