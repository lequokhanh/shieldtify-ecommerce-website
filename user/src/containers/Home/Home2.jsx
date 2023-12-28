import { Box, Flex, Heading, Grid, Image, Text } from '@chakra-ui/react'
import { productCategories } from '../../Categories'
import { useNavigate } from 'react-router-dom'

const Home2 = () => {
    const navigate = useNavigate()
    return (
        <Box fontFamily="Inter, sans-serif">
            <Flex flexDir="column" padding="88px 95px" gap="50px">
                <Box>
                    <Heading
                        fontSize="3.5rem"
                        color="shieldtify.100"
                        fontWeight="700"
                    >
                        Components
                    </Heading>
                </Box>
                <Flex justifyContent="center">
                    <Grid templateColumns="repeat(4, 1fr)" gap="25px">
                        {productCategories.map((category) => (
                            <Flex
                                flexDir="column"
                                key={category.id}
                                border="2.5px solid black"
                                borderRadius="20px"
                                padding="45px 80px 0px"
                                textAlign="center"
                                alignItems="center"
                                justifyContent="space-around"
                                w="293px"
                                h="293px"
                                opacity="0.5"
                                _hover={{
                                    opacity: '1',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    navigate(
                                        `/products?category=${category.redir}`
                                    )
                                }}
                            >
                                <Image src={category.image} width="120px" />
                                <Text
                                    fontSize="2.25rem"
                                    fontWeight="600"
                                    // lineHeight="35px"
                                >
                                    {category.name}
                                </Text>
                            </Flex>
                        ))}
                    </Grid>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Home2
