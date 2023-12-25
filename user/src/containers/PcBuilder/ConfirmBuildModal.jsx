import { 
    Modal,
    ModalContent, 
    ModalOverlay,
    Image,
    VStack,
    Heading,
    Button,
    HStack,
    Text
} from "@chakra-ui/react"
import * as router from "react-router-dom"
import check from "../../assets/check.svg"

const ConfirmBuildModal = ({isOpen, onClose, handleRemove, handleKeep}) => {
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
                <VStack gap="20px">
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
                    fontFamily="Inter"
                    fontWeight="400"
                    lineHeight="normal"
                    textAlign="center"
                    >
                        Do you want to keep your current items 
                        in your cart or replace with your build
                    </Text>
                    <HStack mt="25px" gap="43px" fontFamily="Inter, sans-serif">
                        <Button
                            colorScheme="gray"
                            color="#FF6262"
                            bgColor="#FFF0F0"
                            fontWeight="400"
                            borderRadius="12px"
                            onClick={() => {
                                handleRemove();
                                onClose();
                            }}
                        >
                            Remove
                        </Button>
                        <Button
                        colorScheme="blackAlpha"
                        color="#FFFFFF"
                        bgColor="#444444"
                        borderRadius="12px"
                        fontWeight="400"
                        as={router.Link}
                        onClick={() => {
                            handleKeep();
                            onClose();
                        }}
                        >
                            Yes, keep it
                        </Button>
                    </HStack>
                </VStack>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmBuildModal;