import { 
    Image,
    Flex,
    Grid,
    Text,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import no_img from "../../assets/no_img.svg";

const SecondModal = ({selectedProducts,currentCategoryRedir}) => {
    const firstNineProducts = selectedProducts.slice(0, 7); 

    return (
        <Flex
        minW="450px"
        minH="800px"
        borderRadius="0px 15px 15px 0px"
        borderLeft="1px solid black"
        bgColor="white"
        fontFamily="Inter, sans-serif"
        overflow="auto" // added overflow property
        overflowY="hidden"
        flexDir="column"
        // padding="72px 40px"  
        justifyContent="center"
        position="relative"
        >
                <Grid gridTemplateColumns="repeat(1,1fr)" paddingX="40px">
                {
                    firstNineProducts.map((item) => (
                        <Flex
                        key={item.uid}
                        gap="20px"
                        alignItems="center"
                        padding= "10px 20px"
                        justifyContent="flex-start"
                        paddingY="10px"
                        whiteSpace="nowrap"
                        overflowX="hidden"
                        _hover={{
                            background: "shieldtify.grey.300",
                            cursor: "pointer",
                            borderRadius: "15px"
                        }}
                        onClick={() => {
                            window.location.href = `/product/${item.uid}`;
                        }}
                        >
                            <Image w="60px" h="70px" objectFit="contain" src={item.primary_img ?item.primary_img : no_img}/>
                            <Text
                            fontSize="1.25rem"
                            fontWeight="400"
                            color="shieldtify.100"
                            isTruncated
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
                paddingX="20px"
                position="absolute"
                bottom="4"
                right="1"
                >
                    <Text
                    fontSize="1.25rem"
                    fontWeight="400"
                    color="shieldtify.100"
                    _hover={{
                    cursor: "pointer",
                    textDecorationLine: "underline",  
                    }}
                    onClick={() => {
                        window.location.href = `/products?category=${currentCategoryRedir}`;
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