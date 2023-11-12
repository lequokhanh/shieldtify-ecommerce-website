import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Flex,
    Heading,
    Divider,
    VStack,
    HStack,
    Text,
    Button
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const CartModal = ({isOpen, onClose}) => {
    return(
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount="true"
        motionPreset="slideInTop"
        size="xl"
        >
            <ModalOverlay/>
            <ModalContent     
            position="absolute"
            right="1%"
            top="3%"
            borderRadius="15px"
            padding="55px 50px"
            >
                <ModalCloseButton/>
                <Flex flexDir="column" fontFamily="Inter, sans-serif" alignItems="center" justifyContent="center" gap="22px">
                    <Heading color="shieldtify.100" fontSize="2.25rem" fontWeight="700">
                        Cart
                    </Heading>
                    <Divider/>
                    <Divider/>
                    <VStack gap="10px">
                        <HStack color="shieldtify.100">
                            <Text fontWeight="500">
                                Subtotal
                            </Text>
                            <Text fontSize="0.875rem" fontWeight="400">
                                50000$
                            </Text>
                        </HStack>
                        <HStack color="shieldtify.100">
                            <Text fontWeight="500">
                                Discount
                            </Text>
                            <Text fontSize="0.875rem" fontWeight="400">
                                5000$
                            </Text>
                        </HStack>
                        <HStack color="shieldtify.100">
                            <Text fontSize="1.25rem" fontWeight="700" color="#3C619E">
                                Total
                            </Text>
                            <Text fontSize="0.875rem" fontWeight="400">
                                45000$
                            </Text>
                        </HStack>
                    </VStack>
                    <HStack>
                        <Button
                    colorScheme='blackAlpha'
                    bgColor="shieldtify.100"
                    color="#FFFFFF"
                    type='submit'
                    w="full"
                    paddingX="60px"
                    borderRadius="20px"
                    fontWeight="600"
                    fontSize="0.875rem"                        
                        >
                            View cart
                        </Button>
                        <Button
                        colorScheme='blackAlpha'
                        bgColor="shieldtify.200"
                        color="#FFFFFF"
                        type='submit'
                        w="full"
                        paddingX="60px"
                        borderRadius="20px"
                        fontWeight="600"
                        fontSize="0.875rem"     
                        >
                            Confirm order
                            <ArrowForwardIcon/>
                        </Button>
                    </HStack>
                </Flex>
            </ModalContent>
        </Modal>
    )
}

export default CartModal;