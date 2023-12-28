import { Flex, Heading, Textarea } from "@chakra-ui/react"

const ProductSpecification = ({spec,setSpec,role}) => {
    let handleInputChange = (e) => {
        let inputValue = e.target.value;
        setSpec(inputValue);
    }
    return(
    <Flex flexDir="column" fontFamily="Inter" gap="8px" w="70%">
        <Heading color="#424856" fontSize="0.875rem" fontWeight="700">
            Product specification
        </Heading>
        <Textarea
        h="541px"
        border="1px solid #cbd5e0" 
        borderRadius="12px"
        value={spec}
        isDisabled={role === "staff"}
        onChange={handleInputChange}
        />
    </Flex>
    )
}

export default ProductSpecification;