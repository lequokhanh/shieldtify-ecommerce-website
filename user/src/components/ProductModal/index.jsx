import {accessoriesCategories, productCategories} from "../../Categories";
import category_next from "../../assets/category_next.svg"
import category_next_hover from "../../assets/category_next_hover.svg"
import SecondModal from "./secondModal";
import { getAllProductByCategoryOrKeyword } from "../../utils/api";
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
} from '@chakra-ui/react';
import { useState } from 'react';


const ProductModal = ({isOpen,onClose}) => {
    const [modalContentStyle, setModalContentStyle] = useState({borderRadius: "15px"});
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentCategoryRedir, setCurrentCategoryRedir] = useState("");
    const handleProductCategoryClick = async (category) => {
        setModalContentStyle(prevStyle => {
            if (prevStyle.borderRadius === "15px") {
                return { borderRadius: "15px 0px 0px 15px" };
            } else {
                return { borderRadius: "15px" };
            }
        });
        await getAllProductByCategoryOrKeyword({category}).then((res) => {
            setSelectedProducts(res.data.data.items);
            setIsSecondModalOpen(!isSecondModalOpen);
            setCurrentCategoryRedir(category);
        });
    }
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
            fontFamily="Inter, sans-serif"
            position="absolute"
            top="1%"
            left="1%"
            maxW="450px"
            h="800px"
            style={modalContentStyle}
            >
                <ModalCloseButton variant="custom" size="sm" right="0px" left="10px" top="10px"/>
                <Flex gap="20px" paddingRight="23px">
                        <Flex gap="40px" flexDir="column" padding="50px 35px" >
                            <Flex flexDir="column" gap="15px" >
                                <Heading 
                                color="shieldtify.100" 
                                fontSize="1.5rem"
                                fontWeight="700"
                                >
                                Essentials
                                </Heading>
                                <Grid gridTemplateColumns="repeat(3,1fr)" gap="10px" >
                                    {
                                        productCategories.map((category) => (
                                            <Flex 
                                            key={category.id}
                                            padding="12px 20px"
                                            borderRadius="8px"
                                            border="1px solid black"
                                            alignItems="center"
                                            justifyContent="center"
                                            flexDir="column"
                                            textAlign="center"
                                            onClick={() => handleProductCategoryClick(category.redir)}
                                            _hover={{ 
                                                cursor: "pointer",
                                                background: "shieldtify.grey.300",
                                            
                                            }}
                                            >
                                                <Image w="50px" src={category.image}/>
                                                <Text 
                                                fontSize="1rem"
                                                fontWeight="600"
                                                color="shieldtify.100"
                                                >
                                                    {category.name}
                                                </Text>
                                            </Flex>
                                        ))
                                    }
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
                                    {
                                        accessoriesCategories.map((category) => (
                                            <Flex   
                                                justifyContent="space-between" 
                                                key={category.id}
                                                _hover={{
                                                    textDecorationLine: "underline",
                                                    cursor: "pointer",
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
                                        ))
                                    }
                                </Flex>
                            </Flex>
                        </Flex>
                        
                    {isSecondModalOpen &&
                    <Box>
                        <SecondModal selectedProducts={selectedProducts} currentCategoryRedir={currentCategoryRedir}/>
                    </Box> 
                    }
                </Flex>
            </ModalContent>
    </Modal>
    )
}

export default ProductModal