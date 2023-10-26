import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Image,
    Box,
    Flex,
    Text
} from '@chakra-ui/react';
import confirm from '../../assets/Confirm.png';

const ConfirmModal = ({email,isOpen, onClose}) => {
    return (
        <Modal
            closeOnOverlayClick="false"
            isOpen={isOpen}
            onClose={onClose}
            blockScrollOnMount="true"
            motionPreset="slideInTop"
            size="5xl"
        >
            <ModalOverlay/>
            <ModalContent border="1px">
            <ModalCloseButton />
                <Flex gap="70px" padding="51px 53px" alignItems="flex-end" >
                    <Flex maxW="250px" flexDir="column" alignItems="center" justifyContent="center" gap="20px">
                        <Image src={confirm}/>
                        <Text whiteSpace="nowrap" fontSize="1.75rem" fontWeight="800" >Email Confirmation</Text>
                    </Flex>
                    <Flex flexDir="column" gap="70px" alignItems="flex-end">
                        <Box whiteSpace="nowrap" fontSize="1.25rem" fontWeight="300" alignItems="flex-start">
                            <Text>We have sent an email to </Text>
                            <Text color="#FF6262" fontWeight="500">{email}</Text>
                            <Text>
                                to confirm the validity of your email.<br/> Follow the link provided in your email to complete the registration
                                </Text>
                        </Box>

                        <Text fontStyle="italic" fontSize="0.9375rem" fontWeight="300">
                            cant find the email? 
                            <span style={{ color: '#00A3FF' }}> Resend confirmation email</span>
                            </Text>
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    );
}

export default ConfirmModal;