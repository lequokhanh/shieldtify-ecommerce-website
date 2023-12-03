import { Card, CardBody, Image, Flex, Text, Heading } from "@chakra-ui/react"
import voucher from "../../assets/CheckOut/voucher.svg"
import remove_code from "../../assets/CheckOut/remove_code.svg"
import { useContext } from "react"
import { getUserCart } from "../../utils/api"
import { CartContext } from "../../context/cart.context"

const CodeCard = ({code}) => {
    const { setDiscountedCode, setCartItems,setCartTotal,setDiscountedPrice } = useContext(CartContext);
    return (
        <Card
        direction="row"
        alignItems="center"
        padding="12px"  
        bgColor="#FFFFFF"
        border="1px solid #BDC1CA"
        >
            <Image src={voucher} alt="voucher" w="24px" h="24px" />
            <CardBody
            alignItems="flex-start"
            justifyItems="flex-start"
            padding="0"
            pl="10px"
            >
                <Flex 
                flexDir="column"
                // whiteSpace="wrap"
                w="190px"
                fontFamily="Inter, sans-serif"
                >
                    <Heading
                    fontSize="0.875rem"
                    color="shieldtify.checkout"
                    fontWeight="700"
                    isTruncated
                    >
                        {code.discount}
                    </Heading>
                    <Text
                    fontSize="0.625rem"
                    color="shieldtify.checkout"
                    fontWeight="700"
                    noOfLines="2"
                    >
                        {code.description}
                    </Text>
                </Flex>
            </CardBody>
            <Image 
            src={remove_code} 
            alt="remove-code"
            w="12px" 
            h="12px"
            _hover={{
                cursor: "pointer"
            }}
            onClick={async () => {
                await getUserCart().then((res) => {
                    setCartItems(res.data.data.cart);
                    setCartTotal(res.data.data.total);
                    setDiscountedPrice(0);
                    setDiscountedCode("");
                });
            }}
            />
        </Card>
    )
}

export default CodeCard;