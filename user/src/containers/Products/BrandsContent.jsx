import { 
    PopoverArrow,
    Flex,
    Checkbox,
    Button,
    FormControl,
    CheckboxGroup
} from "@chakra-ui/react"

const BrandsContent = ({Brands,selectedBrands,handleCheckBoxChange,submitBrandsSearch}) => {
    return (
        <>
            <PopoverArrow/>
            <Flex flexDir="column" gap="15px" padding="35px 30px"> 
                <FormControl>
                    <Flex justifyContent="center" flexDir="column" gap="10px">
                        <CheckboxGroup
                        value={selectedBrands}
                        onChange={handleCheckBoxChange}
                        >
                        {
                        Brands.map((brand) => (
                            <Checkbox 
                            colorScheme="blackAlpha"
                            key={brand}  
                            borderColor="#D9D9D9"
                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                            fontSize="0.9375rem"
                            value={brand}
                            >
                                {brand}
                            </Checkbox>
                            ))
                        }
                        </CheckboxGroup>
                        <Button
                        bgColor="#2D2D2D"
                        borderRadius="25px"
                        colorScheme="blackAlpha"
                        onClick={() => {selectedBrands ? submitBrandsSearch(selectedBrands) : submitBrandsSearch('')}}
                        >
                            Submit
                        </Button>                        
                    </Flex>
                </FormControl>
            </Flex>
        </>
    )
}

export default BrandsContent;