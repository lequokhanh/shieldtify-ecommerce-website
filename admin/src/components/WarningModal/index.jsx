import { 
    Modal,
    ModalContent, 
    ModalOverlay,
    Image,
    VStack,
    Heading,
    Button,
} from "@chakra-ui/react"
import warningSign from "../../assets/warningSign.svg"

const WarningPrimaryModal = ({isOpen, onClose,title}) => {
    return (
        <Modal
        blockScrollOnMount={'false'}
        isOpen={isOpen}
        onClose={onClose}
        size={'md'}              
        >
            <ModalOverlay/>
            <ModalContent
                padding="20px 50px"
                border="1px solid #BDC1CA"
                borderRadius="18px"
                position="absolute"
                top="200px"
            >
                <VStack gap="40px">
                    <Image
                    src={warningSign}
                    alt="warningSign"
                    padding="10px 10px"
                    // bgColor="#F6F6F  6"
                    // border="1px solid #F6F6F6"
                    />
                    <Heading
                        color="shieldtify.checkout"
                        fontSize="1.5rem"
                        fontWeight="700"
                        lineHeight="36px"
                    >
                        {title}
                    </Heading> 
                    <Button
                    fontFamily="Inter"
                    mt="25px"
                    colorScheme="gray"
                    color="#FF6262"
                    bgColor="#FFF0F0"
                    fontWeight="400"
                    borderRadius="12px"
                    onClick={onClose}
                    >
                        Cancel
                    </Button>
                </VStack>
            </ModalContent>
        </Modal>
    )
}

export default WarningPrimaryModal;