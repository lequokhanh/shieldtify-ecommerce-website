import { accessoriesCategories, productCategories } from '../../Categories'
import category_next from '../../assets/category_next.svg'
import SecondModal from './secondModal'
import { getAllProductByCategoryOrKeyword } from '../../utils/api'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Image,
    Flex,
    Heading,
    Grid,
    Text,
    Box,
} from '@chakra-ui/react'
import { useState } from 'react'

const ProductModal = ({ isOpen, onClose }) => {
    const [modalContentStyle, setModalContentStyle] = useState({
        borderRadius: '15px',
    })
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [currentCategoryRedir, setCurrentCategoryRedir] = useState('')
    const handleProductCategoryClick = async (category) => {
        if (category !== currentCategoryRedir) {
            await getAllProductByCategoryOrKeyword({ category }).then((res) => {
                setSelectedProducts(res.data.data.items)
                setIsSecondModalOpen(true)
                setCurrentCategoryRedir(category)
            })
            setModalContentStyle({ borderRadius: '15px 0px 0px 15px' })
        } else {
            setIsSecondModalOpen(false)
            setCurrentCategoryRedir('')
            setModalContentStyle({ borderRadius: '15px' })
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            blockScrollOnMount="true"
            motionPreset="slideInTop"
            size="xl"
        >
            <ModalOverlay />
            <ModalContent
                fontFamily="Inter, sans-serif"
                position="absolute"
                top="1%"
                left="1%"
                maxW="480px"
                h="800px"
                style={modalContentStyle}
            >
                <ModalCloseButton
                    variant="custom"
                    size="sm"
                    right="0px"
                    left="10px"
                    top="10px"
                />
                <Flex gap="20px" paddingRight="23px">
                    <Flex gap="40px" flexDir="column" padding="50px 35px">
                        <Flex flexDir="column" gap="15px">
                            <Heading
                                color="shieldtify.100"
                                fontSize="1.5rem"
                                fontWeight="700"
                            >
                                Essentials
                            </Heading>
                            <Grid
                                gridTemplateColumns="repeat(3,1fr)"
                                gap="10px"

                            >
                                {productCategories.map((category) => (
                                    <Flex
                                        key={category.id}
                                        padding="12px 20px"
                                        borderRadius="8px"
                                        border="1px solid black"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexDir="column"
                                        textAlign="center"
                                        w="120px"
                                        h="120px"
                                        background={
                                            category.redir ==
                                            currentCategoryRedir
                                                ? 'shieldtify.grey.300'
                                                : ''
                                        }
                                        onClick={() =>
                                            handleProductCategoryClick(
                                                category.redir
                                            )
                                        }
                                        _hover={{
                                            cursor: 'pointer',
                                            background: 'shieldtify.grey.300',
                                        }}
                                    >
                                        <Image  src={category.image} objectFit="contain" />
                                        <Text
                                            fontSize="1rem"
                                            fontWeight="600"
                                            color="shieldtify.100"
                                            lineHeight="1.2"
                                        >
                                            {category.name}
                                        </Text>
                                    </Flex>
                                ))}
                            </Grid>
                        </Flex>
                        <Flex flexDir="column" gap="15px">
                            <Heading
                                color="shieldtify.100"
                                fontSize="1.5rem"
                                fontWeight="700"
                            >
                                Accessories / Others
                            </Heading>
                            <Flex gap="15px" flexDir="column" paddingX="20px">
                                {accessoriesCategories.map((category) => (
                                    <Flex
                                        justifyContent="space-between"
                                        key={category.id}
                                        _hover={{
                                            textDecorationLine: 'underline',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Text
                                            color="shieldtify.100"
                                            fontSize="1.25rem"
                                            fontWeight="300"
                                        >
                                            {category.name}
                                        </Text>
                                        <Image
                                            src={category_next}
                                            alt={category.name}
                                        />
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>

                    {isSecondModalOpen && currentCategoryRedir != '' && (
                        <Box>
                            <SecondModal
                                selectedProducts={selectedProducts}
                                currentCategoryRedir={currentCategoryRedir}
                            />
                        </Box>
                    )}
                </Flex>
            </ModalContent>
        </Modal>
    )
}

export default ProductModal
