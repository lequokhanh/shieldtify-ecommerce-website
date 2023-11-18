import { 
    Image,
    Text,
    Flex
} from "@chakra-ui/react";
import money_sign from "../../assets/Products/money_sign.svg";


const PriceTag = ({price}) => {
    return (
        <Flex
        bgColor="shieldtify.grey.300"
        borderRadius="10px"
        padding="10px 13px"
        alignSelf="flex-start"
        gap="30px"
        >
            <Image src={money_sign} alt="money-sign"/>
            <Text 
            color="shieldtify.100" 
            fontFamily="Inter, sans-serif"
            fontWeight="400"
            >
                {price}
            </Text>
        </Flex>
    )
}

export default PriceTag;