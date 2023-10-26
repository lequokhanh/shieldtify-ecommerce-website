import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Image,
    Flex,
    Text,
    Button,
} from '@chakra-ui/react';
import * as router from "react-router-dom";
import checkmarkDone from "../../assets/checkmark_done.png";

const CompletedModal = ({isOpen, onClose}) => {
    return (
        <Modal
        closeOnOverlayClick="false"
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount="true"
        motionPreset="slideInTop"
        size="xl"
        >
            <ModalOverlay/>
            <ModalContent border="0.5px solid #444" borderRadius="15px">
                <ModalCloseButton />
                <Flex marginX="30px" marginY="55px" flexDir="column" justifyContent="center" alignItems="center" gap="20px" textAlign="center">
                    <Image src={checkmarkDone}/>                        

                    <Text color="#2D2D2D" fontSize="1.75rem" fontWeight="800">
                        All done!
                    </Text>                        
                    <Text color="#000" fontSize="1.25rem" fontWeight="300">
                    You’re all set and ready to start
                    </Text>
                    <Button
                    colorScheme='blackAlpha'
                    bgColor="#2D2D2D"
                    color="#FFFFFF"
                    type='submit'
                    borderRadius="20px"
                    fontWeight="600px"
                    fontSize="0.875rem"
                    paddingX="80px"
                    as={router.Link} 
                    to="/"
                    _hover={{cursor: "pointer"}}
                    >
                    Get started
                    </Button>   
            </Flex>
        </ModalContent>
    </Modal>
    )
}

export default CompletedModal;