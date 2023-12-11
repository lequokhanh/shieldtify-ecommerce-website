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
    Text,
    Button,
    VStack,
} from '@chakra-ui/react'
import search_icon from '../../assets/search-icon.svg'
import no_img from '../../assets/no_img.svg'
import { getAllProductByCategoryOrKeyword } from '../../utils/api'
import { useState } from 'react'
import * as router from 'react-router-dom'
const SearchModal = ({ isOpen, onClose }) => {
    const navigate = router.useNavigate()
    const [search, setSearch] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const handleSearch = async (search) => {
        if (search !== '') {
            await getAllProductByCategoryOrKeyword({ keyword: search }).then(
                (res) => {
                    setFilteredProducts(res.data.data.items)
                }
            )
            setIsSearching(true)
        } else {
            setIsSearching(false)
            setFilteredProducts([])
            setSearch('')
        }
    }
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }
    const redirect = () => {
        navigate(`/products?keyword=${search}`)
        onClose()
        handleSearch('')
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            blockScrollOnMount="true"
            motionPreset="slideInTop"
            size="lg"
        >
            <ModalOverlay />
            <ModalContent
                position="absolute"
                right="1%"
                top="3%"
                borderRadius="15px"
                fontFamily="Inter, sans-serif"

                // w="500px"
                // h="700px"
            >
                <ModalCloseButton />
                <Flex
                    flexDir="column"
                    justifyContent="space-between"
                    paddingX="70px"
                >
                    <InputGroup my="45px">
                        <Input
                            border="1px solid rgba(68, 68, 68, 0.4)"
                            borderRadius="20px"
                            placeholder="Search..."
                            value={search}
                            onChange={handleSearchChange}
                            type="search"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch(search)
                                }
                            }}
                        />
                        <InputRightElement
                            _hover={{
                                cursor: 'pointer',
                            }}
                            onClick={() => handleSearch(search)}
                        >
                            <Image src={search_icon} />
                        </InputRightElement>
                    </InputGroup>
                    <Flex gap="30px" flexDir={'column'} alignItems={'center'}>
                        {filteredProducts.length > 0 && isSearching ? (
                            <Flex
                                overflowX="hidden"
                                flexDir="column"
                                gap={'20px'}
                            >
                                {filteredProducts.slice(0, 5).map((product) => (
                                    <Flex
                                        key={product.uid}
                                        gap="40px"
                                        alignItems={'center'}
                                        padding="10px"
                                        _hover={{
                                            background: 'shieldtify.grey.300',
                                            cursor: 'pointer',
                                            borderRadius: '15px',
                                        }}
                                        onClick={() => {
                                            onClose()
                                        }}
                                        as={router.Link}
                                        to={`/product/${product.uid}`}
                                    >
                                        <Image
                                            src={
                                                product.primary_img
                                                    ? product.primary_img
                                                    : no_img
                                            }
                                            boxSize={'50'}
                                            objectFit={'contain'}
                                        />
                                        <VStack alignItems="flex-start">
                                            <Text
                                                fontSize="1.125rem"
                                                fontWeight="600"
                                                color="shieldtify.100"
                                                noOfLines={1}
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
                                <Flex
                                    justifyContent="center"
                                    fontFamily="Roboto, sans-serif"
                                    mt="20px"
                                >
                                    <Button
                                        colorScheme="blackAlpha"
                                        borderRadius="20px"
                                        paddingX="100px"
                                        paddingY="20px"
                                        mb="35px"
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
                        ) : isSearching ? (
                            <Text mb="35px" fontWeight="500">
                                No results found
                            </Text>
                        ) : (
                            <></>
                        )}
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    )
}

export default SearchModal
