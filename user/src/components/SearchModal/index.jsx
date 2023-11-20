import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
    Box,
    Text,
    Button,
    VStack
} from '@chakra-ui/react';
import core_i7 from '../../assets/core_i7.svg'
import search_icon from '../../assets/search-icon.svg'
import { getAllProductByCategoryOrKeyword } from '../../utils/api';
import { useState } from 'react';


const SearchModal = ({isOpen, onClose}) => {
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const handleSearch = async (search) => {
        if(search!==""){
            await getAllProductByCategoryOrKeyword({keyword:search}).then((res) => {
                setFilteredProducts(res.data.data.items);
            });
        }else{
            setFilteredProducts([]);
        }
    };
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
    const redirect = () => {
        window.location.href = `/products?keyword=${search}`;
    };
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
        fontFamily="Inter, sans-serif"
        
        // w="500px"
        // h="700px"
        >
            <ModalCloseButton/>
                <Flex flexDir='column'>
                    <InputGroup padding="18.5px 11px" mt="30px">
                        <Input 
                        border="1px solid rgba(68, 68, 68, 0.4)"
                        borderRadius="20px"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearchChange}
                        type="search"
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                handleSearch(search);
                            }
                        }}
                        />
                        <InputRightElement 
                        position="absolute" 
                        right="4" 
                        top="17px" 
                        _hover={{
                            cursor: "pointer"
                        }}
                        onClick={() => handleSearch(search)}
                        >
                            <Image src={search_icon}/>
                        </InputRightElement>
                    </InputGroup>
                    {
                        filteredProducts.length > 0 && (
                            <Flex
                                flexDir="column"
                                gap="10px"
                                justifyContent="space-between"
                                paddingX="70px"
                            >
                                <Box
                                overflowX="hidden"
                                >
                                    {filteredProducts.slice(0, 5).map((product) => (
                                        <Flex key={product.uid} gap="40px">
                                            <Image src={core_i7} />
                                            <VStack alignItems="flex-start">
                                                <Text
                                                    fontSize="1.125rem"
                                                    fontWeight="600"
                                                    color="shieldtify.100"
                                                    textOverflow="ellipsis"
                                                    whiteSpace="nowrap"
                                                >
                                                    {product.name}
                                                </Text>
                                                <Text
                                                    fontSize="1.125rem"
                                                    fontWeight="400"
                                                    color="shieldtify.100"
                                                >
                                                    {product.price}
                                                </Text>
                                            </VStack>
                                        </Flex>
                                    ))}
                                </Box>
                                <Flex justifyContent="center" fontFamily="Roboto, sans-serif" mt="20px">
                                    <Button
                                        colorScheme="blackAlpha"
                                        borderRadius="20px"
                                        paddingX="100px"
                                        paddingY="20px"
                                        mb="10px"
                                        bgColor="shieldtify.100"
                                        fontSize="0.875rem"
                                        fontWeight="600"
                                        color="#FFFFFF"
                                        onClick={redirect}
                                    >
                                        View all results
                                    </Button>
                                </Flex>
                            </Flex>
                        )
                    }
                </Flex>
        </ModalContent>
    </Modal>
    )
}

export default SearchModal;