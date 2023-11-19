import { Box, Image, Flex, Heading, Text } from "@chakra-ui/react"
import product_cover from "../../assets/Products/product_cover.png";


const Banner = ({category,categoryDescription,keyword}) => {
    console.log(keyword);
    return (
    <Box position="relative">                
        <Image src={product_cover} alt="product-cover" w="100%"/>
        {
            (categoryDescription !== "" && !keyword) ?
            (
            <Box 
            position="absolute"
            bottom="20px"
            left="20px"
            w="400px"
            h="max-content"
            borderRadius="10px" 
            background="shieldtify.grey.100"
            >
                <Flex 
                gap="10px"
                flexDir="column"
                padding="20px 27px 20px">
                    <Heading fontSize="2.5rem" fontWeight="900" color="#FFFFFF">
                        {category}
                    </Heading>
                    <Text color="shieldtify.grey.200" fontSize="1.25rem">
                        {categoryDescription}
                    </Text>
                </Flex>
            </Box>
            ) 
            :
            null
        }
    </Box>
    )
}
    


export default Banner;