import {
    PopoverArrow,
    Flex,
    Checkbox,
    Button,
    FormControl,
    CheckboxGroup,
} from '@chakra-ui/react'

const BrandsContent = ({
    Brands,
    selectedBrands,
    handleCheckBoxChange,
    submitBrandsSearch,
    onClose,
    type
}) => {
    return (
        <>
            <PopoverArrow />
            <Flex flexDir="column" gap="15px" padding="25px 20px">
                <FormControl>
                    <Flex
                        flexDir="column"
                        gap="5px"
                        minW="145px"
                        maxH="300px"
                        overflowY="auto"
                    >
                        <CheckboxGroup
                            value={selectedBrands}
                            onChange={handleCheckBoxChange}
                        >
                            {Brands.map((brand) => (
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
                            ))}
                        </CheckboxGroup>
                    </Flex>
                    {
                        type!== "builder" && (
                            <Flex justifyContent="center">
                                <Button
                                    mt="10px"
                                    bgColor="#2D2D2D"
                                    borderRadius="25px"
                                    paddingX="50px"
                                    colorScheme="blackAlpha"
                                    onClick={() => {
                                        selectedBrands
                                            ? submitBrandsSearch(selectedBrands)
                                            : submitBrandsSearch('')
                                        onClose()
                                    }}
                                >
                                    Submit
                                </Button>
                            </Flex>
                        )
                    }
                </FormControl>
            </Flex>
        </>
    )
}

export default BrandsContent
