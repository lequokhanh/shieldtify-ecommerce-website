import { Flex, Text, Button, Heading, Box, VStack, HStack } from '@chakra-ui/react'
import pc1 from '../../assets/pc/pc12.png'
import pc2 from '../../assets/pc/pc2.png'
import Home1 from './Home1'
import Home2 from './Home2'


const Home = () => {
    return (
    <Flex flexDir="column">
        <Flex
        justifyContent="center"
        alignItems="center"
        gap="30px"
        mt="50px"
        mb="50px"
        mx="81px"
        fontFamily="Inter, sans-serif"
        h="100vh"
        >
            <VStack gap="70px" width="33.3%">
                <VStack>
                    <Heading 
                    fontSize="5rem" 
                    color="shieldtify.100"
                    fontWeight="700"
                    >
                        Get your Perfect PC Today!
                    </Heading>
                    <Text
                    fontSize="1.25rem"
                    fontWeight="300"
                    color="shieldtify.100"
                    >
                    Choose from Our Pre-built Selection or Build Your Own PC with our Components!
                    </Text>
                </VStack>
                <HStack w="full">
                    <Button
                    colorScheme='blackAlpha'
                    bgColor="#2D2D2D"
                    color="#FFFFFF"
                    type='submit'
                    borderRadius="10px"
                    fontWeight="600"
                    padding="30px 46px"
                    fontSize="1.25rem"     
                    >Pre built
                    </Button>
                    <Button
                    colorScheme='whiteAlpha'
                    bgColor="#E8E8E8"
                    color="#2D2D2D"
                    type='submit'
                    padding="30px 27px"
                    border="1px solid black"
                    borderRadius="10px"
                    fontWeight="600"
                    fontSize="1.25rem"                    
                    >Build it yourself</Button>
                </HStack>
            </VStack>
            <Box>
                <Box 
                width="396px" 
                height="348px" 
                bgImage={pc1}
                bgRepeat="no-repeat"
                bgSize="contain"
                transition="linear 0.3s"
                _hover={{
                    bgImage: pc2,
                }}
                marginRight="50px"
                />
            </Box>
            <Flex flexDir="column" gap="16px" width="33.3%">
                <Box>
                    <Heading fontSize="2.25rem" color="shieldtify.100" fontWeight="700">
                    Pre-built
                    </Heading>
                    <Text fontSize="1.25rem" color="shieldtify.100" fontWeight="300">
                    Computers that are already assembled and configured by manufacturers, rather than
                    building one{"'"}s own computer
                    from scratch.
                    </Text>
                </Box>
                <Box>
                    <Heading fontSize="2.25rem" color="shieldtify.100" fontWeight="700">
                    Build it yourself
                    </Heading>
                    <Text fontSize="1.25rem" color="shieldtify.100" fontWeight="300">
                    Main advantages of building your
                    own computer is flexibility and
                    customization. You have full
                    control over the selection of each
                    component, allowing you to choose the best parts for your
                    specific needs and budget.                        
                    </Text>
                </Box>
            </Flex>
        </Flex>
        <Home1/>
        <Home2/>
        {/* <Footer/> */}
    </Flex>
    )
}

export default Home;