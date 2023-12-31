import {
    PopoverArrow,
    RadioGroup,
    Flex,
    Radio,
}   from "@chakra-ui/react";
import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";

const CategoriesPopoverContent = ({close,selectedCategory,setSelectedCategory}) => {
    const { setCurrentCategories, categories, setCurrentPage, setCurrentBrands} = useContext(ProductsContext);
    const handleCheckboxChange = (value) => {
        setSelectedCategory(value);
        setCurrentCategories(value);
        setCurrentPage(1);
        setCurrentBrands([]);
        close();
    }
    return (
        <>
            <PopoverArrow/>
            <RadioGroup
            value={selectedCategory}
            onChange={handleCheckboxChange}
            >
                <Flex flexDir="column" gap="12px" padding="31px 23px 19px 22px">
                {
                    categories && categories.map((category, index) => (
                        <Radio 
                        key={index} 
                        value={category.name}
                        colorScheme="blackAlpha"
                        borderColor="#D9D9D9"
                        fontSize="0.9375rem"
                        fontWeight="400"
                        color="#000000"
                        box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                        >
                            {category.name}
                        </Radio>
                    ))
                }
                </Flex>
            </RadioGroup>
        </>
    )
};

export default CategoriesPopoverContent;