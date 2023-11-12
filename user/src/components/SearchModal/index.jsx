import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Image,
    Input,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react';
import search_icon from '../../assets/search-icon.svg'


const SearchModal = ({isOpen, onClose}) => {
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
        paddingBottom="30%"
        position="absolute"
        right="1%"
        top="3%"
        borderRadius="15px"
        >
            <ModalCloseButton/>
            <InputGroup padding="18.5px 11px" mt="30px" >
                <Input 
                border="1px solid rgba(68, 68, 68, 0.4)"
                borderRadius="20px"
                placeholder="Search..."
                type="search"
                />
                <InputRightElement position="absolute" right="4" top="17px">
                    <Image src={search_icon}/>
                </InputRightElement>
            </InputGroup>
        </ModalContent>
    </Modal>
    )
}

export default SearchModal;