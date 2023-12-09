import { Flex, Image, Input, Text } from '@chakra-ui/react'
import no_img from '../../assets/no_img.svg'
import remove_item from '../../assets/Cart/remove_item.svg'
import { useState } from 'react'
import { updateCart } from '../../utils/api'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import * as router from 'react-router-dom'
const CartItem = ({ item, type, onClose }) => {
    const toast = useToast
    const [isValueInvalid, setIsValueInvalid] = useState(false) // [1
    const {
        setCartTotal,
        removeItemFromCart,
        setCartCount,
        cartCount,
        setCartItems,
        setOutOfStockItems,
        setDiscountedPrice,
        setDiscountedCode,
    } = useContext(CartContext)
    const [itemQuantity, setItemQuantity] = useState(item.quantity)
    const navigate = useNavigate()
    const decreaseCartQuantity = async () => {
        await updateCart({
            item: item.itemid,
            quantity: item.quantity - 1,
        }).then((res) => {
            setCartItems(res.data.data.cart)
            setOutOfStockItems(res.data.data.out_of_stock)
            setCartTotal(res.data.data.total)
            setItemQuantity(item.quantity - 1)
            setDiscountedPrice(0)
            setDiscountedCode('')
            if (itemQuantity === 1) {
                setCartCount(cartCount - 1)
            }
        })
    }
    const increaseCartQuantity = async () => {
        await updateCart({ item: item.itemid, quantity: item.quantity + 1 })
            .then((res) => {
                setCartItems(res.data.data.cart)
                setOutOfStockItems(res.data.data.out_of_stock)
                setCartTotal(res.data.data.total)
                setItemQuantity(itemQuantity + 1)
                setDiscountedPrice(0)
                setDiscountedCode('')
            })
            .catch((err) => {
                toast({
                    title: 'Error',
                    description: err.response.data.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            })
    }
    return (
        <Flex
            key={item.itemid}
            gap="20px"
            padding="10px"
            whiteSpace="nowrap"
            position="relative"
        >
            <Image
                src={item.primary_img ? item.primary_img : no_img}
                w="80px"
                h="80px"
                objectFit="contain"
            />
            <Flex flexDir="column" gap="9px">
                <Text
                    fontWeight="600"
                    fontSize="1.0625rem"
                    maxW="210px"
                    onClick={() => {
                        // navigate(`/product/${item.itemid}`)
                        onClose()
                    }}
                    as={router.Link}
                    to={`/product/${item.itemid}`}
                    isTruncated
                    _hover={
                        type === 'stock'
                            ? {
                                  cursor: 'pointer',
                                  textDecorationLine: 'underline',
                              }
                            : {
                                  cursor: 'pointer',
                              }
                    }
                    textDecoration={
                        type === 'outOfStock' ? 'line-through' : 'none'
                    }
                >
                    {item.name}
                </Text>
                <Flex gap="10px">
                    <Text
                        fontWeight="400"
                        fontSize="1.0625rem"
                        textDecoration={
                            (type === 'outOfStock' || item.old_price) &&
                            item.old_price !== item.new_price
                                ? 'line-through'
                                : 'none'
                        }
                    >
                        {item.old_price ? item.old_price : item.price}$
                    </Text>
                    <Text fontSize="1.0625rem" fontWeight="400" color="#DE3B40">
                        {type === 'outOfStock' ? 'Out of stock!' : null}
                        {item.new_price && item.old_price !== item.new_price
                            ? `${item.new_price}$`
                            : null}
                    </Text>
                </Flex>
                <Flex
                    alignItems="center"
                    bgColor="shieldtify.300"
                    fontFamily="Robot, sans-serif"
                    w="max-content"
                    paddingX="7.5px"
                    border="1px solid #444444"
                    borderRadius="8.3333px"
                >
                    <Text
                        fontSize="1.25rem"
                        fontWeight="300"
                        color="shieldtify.100"
                        _hover={{
                            cursor: 'pointer',
                        }}
                        onClick={decreaseCartQuantity}
                    >
                        -
                    </Text>
                    <Input
                        type="number"
                        paddingX="5px"
                        value={itemQuantity}
                        textAlign="center"
                        onChange={async (e) => {
                            if (e.target.value === '') {
                                setItemQuantity(1)
                            } else {
                                await updateCart({
                                    item: item.itemid,
                                    quantity: e.target.value,
                                })
                                    .then((res) => {
                                        setItemQuantity(
                                            res.data.data.cart[0].quantity
                                        )
                                        setCartItems(res.data.data.cart)
                                        setOutOfStockItems(
                                            res.data.data.out_of_stock
                                        )
                                        setCartTotal(res.data.data.total)
                                        setDiscountedPrice(0)
                                        setIsValueInvalid(false)
                                    })
                                    .catch(() => {
                                        setIsValueInvalid(true)
                                    })
                            }
                        }}
                        isInvalid={isValueInvalid}
                        w="50px"
                        border="none"
                        variant="unstyled"
                    />
                    {/* <Text
                    fontSize="0.75rem"
                    fontWeight="600"
                    color="shieldtify.100"
                    >
                        {itemQuantity}
                    </Text> */}
                    <Text
                        fontSize="1.25rem"
                        fontWeight="300"
                        color="shieldtify.100"
                        _hover={{
                            cursor: 'pointer',
                        }}
                        onClick={increaseCartQuantity}
                    >
                        +
                    </Text>
                </Flex>
            </Flex>
            <Image
                position="absolute"
                src={remove_item}
                right="2%"
                top="35%"
                _hover={{
                    cursor: 'pointer',
                }}
                onClick={async () => {
                    removeItemFromCart({ item: item.itemid })
                    setItemQuantity(0)
                }}
            />
        </Flex>
    )
}

export default CartItem
