import { 
    Box,
    Image,
    Flex,
    Grid,
    Text,
} from '@chakra-ui/react';
import { testProduct } from "../../Categories";
import { ArrowForwardIcon } from '@chakra-ui/icons';

const SecondModal = ({isOpen, onClose, items}) => {
    return (
        <Flex
        minW="450px"
        minH="800px"
        borderRadius="0px 15px 15px 0px"
        borderLeft="1px solid black"
        bgColor="white"
        fontFamily="Inter, sans-serif"
        overflow="auto" // added overflow property
        flexDir="column"
        // padding="72px 40px"  
        justifyContent="center"
        gap="20px"
        >
                <Grid gridTemplateColumns="repeat(1,1fr)">
                {
                    testProduct.map((item) => (
                        <Flex
                        key={item.id}
                        gap="20px"
                        alignItems="center"
                        justifyContent="center"
                        paddingY="10px"
                        _hover={{
                            background: "shieldtify.hover_item",
                            cursor: "pointer",
                        }}
                        >
                            <Image maxW="50px" src={item.image}/>
                            <Text
                            fontSize="1.25rem"
                            fontWeight="400"
                            color="shieldtify.100"
                            >
                                {item.name}
                            </Text>
                        </Flex>
                    ))
                }
                </Grid>
                <Flex  
                justifyContent="flex-end" 
                alignItems="center"
                gap="7px"
                >
                    <Text
                    fontSize="1.25rem"
                    fontWeight="400"
                    color="shieldtify.100"
                    _hover={{
                      cursor: "pointer",
                      textDecorationLine: "underline",  
                    }}
                    >
                        Explore more
                    </Text>
                    <ArrowForwardIcon/>
                </Flex>
        </Flex>
    )
}

export default SecondModal;