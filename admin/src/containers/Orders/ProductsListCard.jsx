import { 
    Box,
    Card,
    CardBody, 
    Flex, 
    HStack, 
    Image, 
    Popover, 
    PopoverContent, 
    PopoverTrigger, 
    Text, 
    VStack 
} from "@chakra-ui/react"
import trashcan from "../../assets/Orders/trashcan.svg";
import editproduct from "../../assets/Orders/editproduct.svg";
import EditOrderPopoverContent from "./EditOrderPopoverContent";

const ProductListCard = ({product, handleDelete,openEdit,isPopOverOpen, setIsPopoverOpen}) => {
    return(
        <Card
        direction="row"
        >
            <CardBody w="330px" bg="#F3F4F6">
                <Flex justifyContent="space-between">
                    <Flex gap="13px">
                        <Flex alignItems="center">
                            <Text color="#323743" fontWeight="400" justifyContent="center">
                                x{product.quantity}
                            </Text>
                        </Flex>
                        <Flex flexDir="column" justifyContent="space-between" w="230px">
                            <Text color="#323743" fontSize="0.875rem" fontWeight="700" isTruncated>
                                {product.item.name}
                            </Text>
                            <HStack gap="10px">
                                <Text 
                                color="#323743" 
                                fontWeight="400"
                                textDecorationLine={(product.new_price-product.old_price!==0) && "line-through"}
                                >
                                    ${product.new_price}
                                </Text>
                                <Text 
                                color="#FF6262" 
                                fontWeight="400"
                                >
                                    {(product.new_price - product.old_price !== 0) && `$${product.old_price}`}
                                </Text>
                            </HStack>
                        </Flex>
                    </Flex>
                    <VStack justifyContent="space-between">    
                        <Image  src={trashcan} w="24px" h="24px" objectFit="contain" onClick={handleDelete} _hover={{cursor:"pointer"}}/>
                        <Popover placement="right-start" closeOnBlur={true}>
                            <PopoverTrigger>
                                <Box as="button" type="button">
                                    <Image src={editproduct} w="24px" h="24px" objectFit="contain" onClick={openEdit} _hover={{cursor:"pointer"}}/>
                                </Box>
                            </PopoverTrigger>
                            <PopoverContent isOpen={isPopOverOpen}>
                                <EditOrderPopoverContent product={product}/>
                            </PopoverContent>
                        </Popover>
                    </VStack>
                </Flex>
            </CardBody>
        </Card>
    )
}

export default ProductListCard;