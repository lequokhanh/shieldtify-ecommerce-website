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
import { useContext } from 'react'
import { CheckOutContext } from '../../context/checkout.context'
import { useNavigate } from 'react-router-dom'

const CheckOutConfirmModal = ({ isOpen, onClose }) => {
    const {
        callCheckOut,
        isCreateAddressOpen,
        setIsCheckOutClicked,
        beingSelected,
    } = useContext(CheckOutContext)
    const toast = useToast()
    const navigate = useNavigate()
    return (
        <Modal
            blockScrollOnMount={'false'}
            isOpen={isOpen}
            onClose={onClose}
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
                        Confirm order
                    </Heading>
                    <Text
                        fontFamily="Inter, sans-serif"
                        fontWeight="400"
                        lineHeight="normal"
                    >
                        Please review your order details carefully before
                        confirming. If you wish to cancel your order after
                        placement, kindly contact us for assistance.
                    </Text>
                    <HStack mt="25px" gap="43px" fontFamily="Inter, sans-serif">
                        <Button
                            colorScheme="gray"
                            color="#FF6262"
                            bgColor="#FFF0F0"
                            fontWeight="400"
                            borderRadius="12px"
                            onClick={onClose}
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
                                if (isCreateAddressOpen) {
                                    toast({
                                        title: 'Please select an address',
                                        status: 'error',
                                        duration: 3000,
                                        isClosable: true,
                                    })
                                    onClose()
                                } else if (beingSelected === '') {
                                    toast({
                                        title: 'No address found in your account',
                                        status: 'error',
                                        duration: 3000,
                                        isClosable: true,
                                    })
                                    onClose()
                                } else {
                                    callCheckOut()
                                    setIsCheckOutClicked(true)
                                    navigate('/checkout/complete')
                                }
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

export default CheckOutConfirmModal
