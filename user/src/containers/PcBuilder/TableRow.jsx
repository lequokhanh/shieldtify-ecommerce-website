import { Button, Flex, HStack, Image, Input, Td, Text, Tr, useToast } from "@chakra-ui/react";
import no_img from '../../assets/no_img.svg'
import deleteBuildItem from "../../assets/deleteBuildItem.svg";

const TableRow = (
    {
        component,
        index, 
        setCurrentCategory,
        openModal,
        decreaseCartQuantity,
        increaseCartQuantity,
        setComponents,
        setComponentTotal,
        components,
        removeItem,
        setCurrentCategoryIndex,
    }) =>    {
    const toast = useToast();
    return(
        <Tr
        bg={(index % 2) ? "#F6F6F6" : "#FFFFFF"}
        borderTop="2px solid rgba(0, 0, 0, 0.50)" // Add top border
        >
            <Td>
                <Text color="shieldtify.200" fontSize="1.25rem" fontWeight="600" textDecoration="underline" _hover={{cursor:"pointer"}}>
                    {component.category}
                </Text>
            </Td>
            <Td>
                {
                    component.uid  ? (
                        <HStack w="500px">
                            <Image src={component.primary_img ? component.primary_img : no_img} alt={component.name} w="50px" h="50px" objectFit="contain"/>
                            <Text fontSize="1.25rem" color="shieldtify.100" fontWeight="400" isTruncated>
                                {component.name}
                            </Text>
                        </HStack>
                    )
                    :
                    (
                        <Button
                        variant="addToCart"
                        paddingX="30px"
                        onClick={() => {
                            setCurrentCategory(component.category)
                            setCurrentCategoryIndex(index);
                            openModal();
                        }}
                        >
                            {component.description ? component.description : "+ Select"}
                        </Button>
                    )
                }
            </Td>
            <Td textAlign="center">
                {
                    component.price && (
                        <Text color="black" fontSize="1.25rem" fontWeight="400">
                            ${component.price}
                        </Text>
                    )
                }
            </Td>
            <Td textAlign="center">
                {
                    component.uid && (
                        <Flex justifyContent="center">
                                <Flex
                                alignItems="center"
                                bgColor="shieldtify.300"
                                fontFamily="Robot, sans-serif"
                                paddingX="7.5px"
                                border="1px solid #444444"
                                borderRadius="8.3333px"
                                >
                                <Text
                                    fontSize="1.25rem"
                                    fontWeight="300"
                                    color="shieldtify.100"
                                    _hover={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => decreaseCartQuantity(component,index)}
                                >
                                    -
                                </Text>
                                <Input
                                    type="number"
                                    paddingX="5px"
                                    value={component.quantity}
                                    textAlign="center"
                                    onChange={(e) => {
                                        if(e.target.value!== ''){
                                            let total = 0;
                                            if(e.target.value > component.stock_qty){
                                                toast({
                                                    title: "Error",
                                                    description: "Quantity exceeds stock quantity",
                                                    status: "error",
                                                    duration: 3000,
                                                    isClosable: true,
                                                })
                                                return;
                                            }
                                            setComponents(components.map((item) => {
                                                if(item.uid === component.uid){
                                                    total += parseFloat((parseInt(e.target.value)*item.price).toFixed(2));
                                                    return {
                                                        ...item,
                                                        quantity: parseInt(e.target.value),
                                                    }
                                                }else{
                                                    if(item.quantity && item.price){
                                                        total += parseFloat((item.quantity*item.price).toFixed(2));
                                                    }
                                                }
                                                return item;
                                            }))
                                            setComponentTotal(total);
                                        }else{
                                            let total = 0;
                                            setComponents(components.map((item) => {
                                                if(item.uid === component.uid){
                                                    total += item.price;
                                                    return {
                                                        ...item,
                                                        quantity: 1,
                                                    }
                                                }else{
                                                    if(item.quantity && item.price){
                                                        total += parseFloat((item.quantity*item.price).toFixed(2));
                                                    }
                                                }
                                                return item;
                                            }))
                                            setComponentTotal(total);
                                        }
                                    }}

                                    w="50px"
                                    border="none"
                                    variant="unstyled"
                                />
                                <Text
                                    fontSize="1.25rem"
                                    fontWeight="300"
                                    color="shieldtify.100"
                                    _hover={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => increaseCartQuantity(component,index)}
                                >
                                    +
                                </Text>
                            </Flex>    
                        </Flex>
                    )
                }
            </Td>
            <Td>
                {
                    component.uid && (
                        <Flex justifyContent="space-between">
                        
                            <Text color="#FF6262" fontSize="1.25rem" fontWeight="400">
                                ${parseFloat((component.price*component.quantity).toFixed(2))}
                            </Text>
                            <Image 
                            src={deleteBuildItem} 
                            alt="Delete item"
                            _hover={{cursor:"pointer"}}
                            onClick={() => {
                                removeItem(component,index);
                            }}
                            />
                        </Flex>
                    )
                }
            </Td>
        </Tr>
    )
}

export default TableRow;