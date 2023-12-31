import {
    PopoverArrow,
    CheckboxGroup,
    Checkbox,
    Flex,
    FormControl,
    Button,
}   from "@chakra-ui/react";
import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";

const BrandsPopoverContent = ({unsubmittedCheckedBrands,setUnsubmittedCheckedBrands}) => {
    const { brands, setCurrentBrands } = useContext(ProductsContext); 

    const handleCheckBoxChange = (value) => {
        setUnsubmittedCheckedBrands(value);
        setCurrentBrands(value);
    }
    return (
        <>
            <PopoverArrow/>
            <Flex flexDir="column" gap="15px" padding="25px 20px" > 
                <FormControl>
                    <Flex  flexDir="column" gap="5px"  minW="145px" maxH="300px" overflowY="auto">
                        <CheckboxGroup
                        value={unsubmittedCheckedBrands}
                        onChange={handleCheckBoxChange}
                        >
                        {
                        brands.map((brand) => (
                            <Checkbox 
                            colorScheme="blackAlpha"
                            key={brand}  
                            borderColor="#D9D9D9"
                            fontFamily="Inter"
                            fontWeight="400"
                            color="#000000"
                            borderRadius="5px"
                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                            fontSize="0.9375rem"
                            value={brand}
                            >
                                {brand}
                            </Checkbox>
                            ))
                        }
                        </CheckboxGroup>
                    </Flex>
                </FormControl>
            </Flex>
        </>
    )
};

export default BrandsPopoverContent;