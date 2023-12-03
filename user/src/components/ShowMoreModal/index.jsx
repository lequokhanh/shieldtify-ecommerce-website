import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    Button,
    Grid,
    Flex,
} from '@chakra-ui/react'
import AddressCard from '../AddressCard';
import { useContext } from 'react';
import { CheckOutContext } from '../../context/checkout.context';

    const ShowMoreModal = ({ isOpen, onClose, addresses}) => {
        const { selectedAddress, setSelectedAddress, setBeingSelected } = useContext(CheckOutContext);    
        const handleAddressClick = (address) => {
            setSelectedAddress(address);
        };
    
        return (
            <Modal
                isOpen={isOpen}
                blockScrollOnMount={'false'}
                onClose={onClose}
                size={'xl'}
            >
                <ModalOverlay/>
                <ModalContent 
                borderRadius={'10px'}
                minH="686px"
                >
                    <ModalHeader
                            bgColor={'#2D2D2D'}
                            color={'white'}
                            borderTopRadius={'10px'}
                            >
                            Select saved address
                        </ModalHeader>
                        <ModalCloseButton
                            bgColor={'white'}
                            borderRadius={'50%'}
                            size={'sm'}
                            mt={'10px'}
                            mr={'10px'}
                            /> 
                        <Flex flexDir="column" justifyContent="space-between" alignItems="center" minH="610px" paddingBottom="15px">
                            <Grid gridTemplateColumns="repeat(2,1fr)"
                            gap="25px"
                            p="22px 37px"
                            fontFamily="Inter, sans-serif"           
                            >
                                {
                                    addresses.map((address) => (
                                        address.is_default && (
                                            <AddressCard 
                                            key={address.uid} 
                                            add={address} onClick={() => handleAddressClick(address)}
                                            isSelected={address.uid === selectedAddress.uid}
                                            />                                            
                                        )
                                    )
                                    )}
                                {
                                    addresses.map((address) => (
                                        !address.is_default && (
                                            <AddressCard 
                                            key={address.uid} 
                                            add={address} onClick={() => handleAddressClick(address)}
                                            isSelected={address.uid === selectedAddress.uid}
                                            />
                                        )
                                    ))
                                }
                            </Grid>
                            <Button
                            w="max-content"
                            fontWeight="600"
                            p="16px 220px"
                            colorScheme='blackAlpha'
                            bgColor="#2D2D2D"
                            color="#FFFFFF"
                            type='submit'
                            borderRadius="20px"
                            onClick={() => {
                                setBeingSelected(selectedAddress);
                                onClose();
                            }}
                            >
                                Select
                            </Button>
                        </Flex>
                </ModalContent>
            </Modal>
        )
    };

    export default ShowMoreModal;
