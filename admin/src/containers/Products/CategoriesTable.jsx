/* eslint-disable react/prop-types */
import { 
    Table, 
    TableContainer, 
    Tbody, 
    Th, 
    Thead,
    Tr,
    Td,
    Text,
    HStack,
    Checkbox,
    Flex
} from "@chakra-ui/react";
import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";

const CategoriesTable = ({checkedCategories,setCheckedCategories}) => {
    const { categories} = useContext(ProductsContext);
    const handleCheckBoxChange = (value) => {
        const category = categories.find(category => category.uid === value);
        if (checkedCategories.includes(category)) {
            setCheckedCategories(checkedCategories.filter(filterCategory => filterCategory !== category));
        } else {
            setCheckedCategories([...checkedCategories, category]);
        }
    }
    return(
    <TableContainer borderRadius='12px' border="1px solid #F3F4F6" mt="18px">
        <Table variant="simple">
            <Thead>
                <Tr bg="#F3F4F6">
                    <Th color="shieldtify.checkout" fontSize="1.125rem" fontWeight="600" textAlign="center">
                        CATEGORY
                    </Th>
                    <Th color="shieldtify.checkout" fontSize="1.125rem" fontWeight="600" textAlign="center"  w="800px">
                        DESCRIPTION
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    categories && categories.map((category,index) => (
                        <Tr key={category.uid} bg={(index % 2) ? "#F3F4F6" : "#FFFFFF"}>
                            <Td>
                                <HStack gap="40px">
                                        <Checkbox 
                                        colorScheme="blackAlpha"
                                        borderRadius='18px'
                                        key={category.uid}  
                                        borderColor="#D9D9D9"
                                        box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                                        fontSize="0.9375rem"
                                        value={category.uid}
                                        onChange={(e) => handleCheckBoxChange(e.target.value)}
                                        />
                                        <Text color="shieldtify.checkout" fontWeight="400"> 
                                            {category.name}
                                        </Text>
                                    </HStack>
                            </Td>
                            <Td >
                                <Flex w="800px">
                                    <Text color="shieldtify.checkout" fontWeight="400" isTruncated> 
                                        {category.description}
                                    </Text>
                                </Flex>
                            </Td>                            
                        </Tr>
                    ))
                }
            </Tbody>
        </Table>
    </TableContainer>
    )
}

export default CategoriesTable;