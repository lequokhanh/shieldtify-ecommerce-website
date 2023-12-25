import { useState, useContext } from 'react'
import { Flex, Box, Image, Button, Text } from '@chakra-ui/react'
import PriceTag from '../PriceTag'
import no_img from '../../assets/no_img.svg'
import { CartContext } from '../../context/cart.context'
import * as router from 'react-router-dom'

const ProductCard = ({ product, type, handleSelect }) => {
    const [hoveredProductId, setHoveredProductId] = useState(null)
    const { addItemToCart } = useContext(CartContext)
    const HoverProduct = (id) => {
        setHoveredProductId(id)
    }
    const UnhoverProduct = () => {
        setHoveredProductId(null)
    }
    return (
        <Flex flexDir="column" gap="20px" justifyContent="space-between">
            <Flex
                flexDir="column"
                gap="20px"
                _hover={{
                    cursor: 'pointer',
                    textDecorationLine: 'underline',
                }}
                onMouseEnter={() => HoverProduct(product.uid)}
                onMouseLeave={UnhoverProduct}
                zIndex="0"
            >
                <Box position="relative" width="100%" height="100%">
                    <Flex as={router.Link} to={`/product/${product.uid}`}>
                        <Image
                            src={
                                product.primary_img
                                    ? product.primary_img
                                    : no_img
                            }
                            alt="product-image"
                            w={type === "builder" ? "200px" : "400px"}
                            h={type === "builder" ? "200px" : "400px"}
                            objectFit="contain"
                        />
                    </Flex>
                    {hoveredProductId === product.uid ? (
                        <Button
                            variant="addToCart"
                            position="absolute"
                            bottom="0"
                            right="0"
                            zIndex="1"
                            onClick={(event) => {
                                event.stopPropagation();
                                type === "builder" ? handleSelect(product) : addItemToCart({ item: product });
                            }}
                        >
                            {
                                type === "builder" ? "+ Select" : "+ Add to cart"
                            }
                        </Button>
                    ) : null}
                </Box>
                <Text
                    fontSize="1.5rem"
                    fontWeight="600"
                    lineHeight="30px"
                    as={router.Link}
                    to={`/product/${product.uid}`}
                >
                    {product.name}
                </Text>
            </Flex>
            <PriceTag price={product.price} />
        </Flex>
    )
}

export default ProductCard
