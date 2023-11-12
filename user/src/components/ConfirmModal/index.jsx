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
import { sendEmailResetPassword } from '../../utils/api';

const ConfirmModal = ({email,isOpen, onClose,type}) => {
    const [lastClickedTime, setLastClickedTime] = useState(0);
    const [resendCountdown, setResendCountdown] = useState(0);

    const handleRegisterResendClick = async () => {
        await sendEmail({
            email
        })
        setLastClickedTime(Date.now());
        setResendCountdown(30);
    }
    const handleResetResendClick = async () => {
        await sendEmailResetPassword(
            email
        )
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
                            {
                                type==="register" ? (
                                <Text>
                                    to confirm the validity of your email.<br/> Follow the link provided in your email to complete the registration
                                </Text>
                                ) : (
                                <Text>
                                    to reset your password.<br/> Follow the link provided in your email to finish resetting your password
                                </Text>                                    
                                )
                            }

                        </Box>
                        <Flex fontStyle="italic" fontSize="0.9375rem" fontWeight="300" gap="3px">
                            <Text>
                                can{"'"}t find the email? 
                            </Text>
                            {
                                type==="register" ? (
                                    <Text 
                                    style={{ color: resendCountdown > 0 ? "#9ad4f5" : "#00a3ff"}}
                                    onClick={handleRegisterResendClick}
                                    _hover={{cursor: resendCountdown > 0 ? "default" : "pointer"}}
                                    disabled={isResendDisabled}
                                    > 
                                    {resendCountdown > 0 ? `Resend confirmation email in ${resendCountdown}s` : ' Resend confirmation email'}
                                    </Text>
                                ) :
                                (
                                    <Text 
                                    style={{ color: resendCountdown > 0 ? "#9ad4f5" : "#00a3ff"}}
                                    onClick={handleResetResendClick}
                                    _hover={{cursor: resendCountdown > 0 ? "default" : "pointer"}}
                                    disabled={isResendDisabled}
                                    > 
                                    {resendCountdown > 0 ? `Resend confirmation email in ${resendCountdown}s` : ' Resend confirmation email'}
                                    </Text>                                    
                                )
                            }
                        </Flex>
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    );
}

export default ConfirmModal;