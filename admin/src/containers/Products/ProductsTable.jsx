import { 
    Checkbox, 
    HStack, 
    Table, 
    TableContainer, 
    Tbody, 
    Td, 
    Text, 
    Th, 
    Thead, 
    Tr } from "@chakra-ui/react";
import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";


const ProductsTable = ({checkedProducts,setCheckedProducts}) => {
    const {products } = useContext(ProductsContext);
    const handleCheckBoxChange = (value) => {
        if (checkedProducts.includes(value)) {
            setCheckedProducts(checkedProducts.filter(uid => uid !== value));
        } else {
            setCheckedProducts([...checkedProducts, value]);
        }
    }
    return (
        <TableContainer borderRadius='12px' border="1px solid #F3F4F6" mt="18px">
            <Table variant="simple">
                <Thead>
                    <Tr bgColor="#F3F4F6">
                        <Th color="shieldtify.checkout" fontSize="1.125rem" fontWeight="600" textAlign="center" w="800px">
                            NAME
                        </Th>
                        <Th  color="shieldtify.checkout" fontSize="1.125rem" fontWeight="600" w="250px">
                            BRAND
                        </Th>
                        <Th color="shieldtify.checkout" fontSize="1.125rem" fontWeight="600">
                            STOCK
                        </Th>
                        <Th
                        color="shieldtify.checkout" fontSize="1.125rem" fontWeight="600">
                            PRICE
                        </Th>
                    </Tr>
                </Thead>
                <Tbody fontFamily="Inter">
                    {
                        products.length > 0 && products.map((product,index) => (
                            <Tr key={product.uid} bg={(index % 2) ? "#F3F4F6" : "#FFFFFF"}>
                                <Td > 
                                    <HStack gap="40px" w="800px">
                                        <Checkbox 
                                        colorScheme="blackAlpha"
                                        borderRadius='18px'
                                        key={product.uid}  
                                        borderColor="#D9D9D9"
                                        box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                                        fontSize="0.9375rem"
                                        value={product.uid}
                                        onChange={(e) => handleCheckBoxChange(e.target.value)}
                                        />
                                        <Text color="shieldtify.checkout" fontWeight="400" isTruncated> 
                                            {product.name}
                                        </Text>
                                    </HStack>
                                </Td>
                                <Td>
                                    <Text color="shieldtify.checkout" fontWeight="400" w="250px"> 
                                        {product.brand}
                                    </Text>
                                </Td>
                                <Td>
                                <Text color="shieldtify.checkout" fontWeight="400"> 
                                        {product.stock_qty}
                                    </Text>
                                </Td>
                                <Td>
                                <Text color="shieldtify.checkout" fontWeight="700"> 
                                        {product.price}$
                                    </Text>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default ProductsTable;