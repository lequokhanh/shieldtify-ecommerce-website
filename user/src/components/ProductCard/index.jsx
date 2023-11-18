import { useState } from "react";
import {
    Flex,
    Box,
    Image,
    Button,
    Text
} from "@chakra-ui/react";
import PriceTag from "../PriceTag";
import product1 from "../../assets/Products/product_img/product1.svg";

const ProductCard = ({product}) => {
    const [ hoveredProductId, setHoveredProductId ] = useState(null);
    const HoverProduct = (id) => {
        setHoveredProductId(id);
    }
    const UnhoverProduct = () => {
        setHoveredProductId(null);
    }    
    return (
    <Flex flexDir="column" gap="20px" justifyContent="space-between"> 
        <Flex 
        flexDir="column" 
        gap="20px"
        _hover={{
            cursor: "pointer",
            textDecorationLine: "underline",
        }}
        onClick={() => window.location.href=`/product/${product.uid}`}
        onMouseEnter={() => HoverProduct(product.uid)}
        onMouseLeave={UnhoverProduct}
        >
            <Box position="relative" width="100%" height="100%">
                <Image src={product1} alt="product-image" width="100%" height="100%" />
                {
                    hoveredProductId === product.uid ? (
                        <Button variant="addToCart" position="absolute" bottom="0" right="0">+ Add to cart</Button>
                    ) 
                    :
                    null
                }
            </Box>
            <Text 
            fontSize="1.5rem" 
            fontWeight="600"
            lineHeight="30px"
            >
                {product.name}
            </Text>
        </Flex>
        <PriceTag price={product.price}/>
    </Flex>
    )
}

export default ProductCard;