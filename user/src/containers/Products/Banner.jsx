import { Box, Image, Flex, Heading, Text } from "@chakra-ui/react"
import product_cover from "../../assets/Products/product_cover.png";


const Banner = () => (
    <Box position="relative">                
        <Image src={product_cover} alt="product-cover" w="100%"/>
        <Box 
        position="absolute"
        bottom="20px"
        left="20px"
        w="400px"
        h="250px"
        borderRadius="10px" 
        background="shieldtify.grey.100"
        >
            <Flex 
            gap="10px"
            flexDir="column"
            padding="25px 27px 53px">
                <Heading fontSize="2.5rem" fontWeight="900" color="#FFFFFF">
                    CPU
                </Heading>
                <Text color="shieldtify.grey.200" fontSize="1.25rem">
                The main processing unit of a computer, responsible for executing calculations and managing system operations. Determines the computer{"'"}s performance and processing speed.
                </Text>
            </Flex>
        </Box>
    </Box>
)

export default Banner;