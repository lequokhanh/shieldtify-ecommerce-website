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
import { sendEmail } from '../../utils/api';
import { useState, useEffect } from 'react';

const ConfirmModal = ({email,isOpen, onClose}) => {
    const [lastClickedTime, setLastClickedTime] = useState(0);
    const [resendCountdown, setResendCountdown] = useState(0);

    const handleResendClick = async () => {
        await sendEmail({
            email
        })
        setLastClickedTime(Date.now());
        setResendCountdown(30);
    }

    const isResendDisabled = Date.now() - lastClickedTime < 60000 || resendCountdown > 0;

    useEffect(() => {
        let intervalId;
        if (resendCountdown > 0) {
            intervalId = setInterval(() => {
                setResendCountdown(countdown => countdown - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [resendCountdown]);

    useEffect(() => {
        if (isOpen) {
            setResendCountdown(30);
        }
    }, [isOpen]);

    useEffect(() => {
        if (resendCountdown === 0 && isResendDisabled) {
            setLastClickedTime(0);
        }
    }, [resendCountdown, isResendDisabled]);
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
                        <Flex fontStyle="italic" fontSize="0.9375rem" fontWeight="300" gap="3px">
                            <Text>
                                can{"'"}t find the email? 
                            </Text>
                            <Text 
                                style={{ color: resendCountdown > 0 ? "#9ad4f5" : "#00a3ff"}}
                                onClick={handleResendClick}
                                _hover={{cursor: resendCountdown > 0 ? "default" : "pointer"}}
                                disabled={isResendDisabled}
                                > 
                                {resendCountdown > 0 ? `Resend confirmation email in ${resendCountdown}s` : ' Resend confirmation email'}
                                </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    );
}

export default ConfirmModal;