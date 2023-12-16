/* eslint-disable react/prop-types */
import { 
    Box,
    Card, 
    CardBody,
    Flex, 
    Image, 
    Text,
    VStack
} from "@chakra-ui/react";

const InfoCard = ({ name, icon, bgColor, iconColor, info, order, orderColor,type, handleFilterClick, filteredOrder}) => {
    return (
        <Card
        borderRadius="18px"
        bgColor={bgColor}
        boxShadow="0px 8px 17px 0px rgba(247, 247, 247, 0.15), 0px 0px 2px 0px rgba(247, 247, 247, 0.12)"
        fontFamily="Inter"
        _hover={type==="order" && {cursor:"pointer"}}
        border={type==="order" && filteredOrder === name ? `1px solid ${iconColor}` : ""}
        onClick={type==="order" ?  (() => handleFilterClick(name)) : null}
        >
            <CardBody>
                <Flex flexDir="column" gap="10px">
                    <Flex gap="70px">
                        <Text color="#323743" fontWeight="400">
                            {name}  
                        </Text>
                        <Image src={icon} alt="icon"  borderRadius="16px" bgColor={iconColor} padding="8px"/>
                    </Flex>
                    <VStack alignItems="flex-start">
                        <Text fontFamily="Roboto" fontSize="1.5rem" fontWeight="600" color="#323743">
                            {info}
                        </Text>
                        {
                            order && (
                                <Box p="3px 8px 3px 8px" fontWeight="400" border={`1px solid ${orderColor}`} borderRadius="12px" >
                                    <Text color={orderColor} fontSize="0.6875rem" fontWeight="400">
                                        {order} orders
                                    </Text>
                                </Box>
                            )
                        }
                    </VStack>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default InfoCard;