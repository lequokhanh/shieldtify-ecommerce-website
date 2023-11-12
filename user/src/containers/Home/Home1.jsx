import 
{ 
    Box, 
    Flex, 
    Heading, 
    Text, 
    Button, 
    Image
} from "@chakra-ui/react";
import { specs } from "../../Categories";
import PCCarousel from "../../components/Carousel";
// 120 110
const Home1 = () => {
    return (
            <Box
            padding="120px 110px 50px"
            background="#2D2D2D" 
            fontFamily="Inter, sans-serif"
            >
                <Heading fontSize="3.5rem" color="#FFF" fontWeight="600">
                    Brand new beast
                </Heading>
                <Flex 
                justifyContent="space-around"
                >
                    <Flex flexDir="column" mt="100px" >
                        <Text color="#FFF" fontSize="4rem" fontWeight="800" mb="22px">
                            $ 2500
                        </Text>
                        <Flex justifyContent="flex-end">
                            <Button
                            colorScheme='whiteAlpha'
                            bgColor="#E8E8E8"
                            color="#2D2D2D"
                            size="md"
                            padding="30px 30px"
                            borderRadius="10px"
                            fontWeight="600"
                            fontSize="1.25rem"
                            >
                                See the details
                            </Button>
                        </Flex>
                    </Flex>
                    <PCCarousel />
                    <Flex gap="25px" flexDir="column" mt="100px">
                        {
                            specs.map((spec) => (
                                <Flex 
                                gap="25px"
                                key={spec.id}
                                >
                                    <Image src={spec.image}/>
                                    <Text
                                    color="#FFF"
                                    fontSize="1.25rem"
                                    fontWeight="600"
                                    >
                                        {spec.title}
                                    </Text>
                                </Flex>
                            ))
                        }
                    </Flex>
                </Flex>
            </Box>
    )
}

export default Home1;