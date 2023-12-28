import { createContext, useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import {
    getUserCart,
    addToCart,
    updateCart,
    removeAllItemsFromCart,
} from '../utils/api'
import { defaultComponentValue } from '../Categories'

export const CartContext = createContext({
    addItemToCart: () => {},
    addMultipleItemsToCart: () => {},
    clearCart: () => {},
    removeItemFromCart: () => {},
    removeAllItemFromCart: () => {},
    outOfStockItems: [],
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    discountedPrice: 0,
    discountedCode: '',
    setCartTotal: () => {},
    setCartItems: () => {},
    setCartCount: () => {},
    setOutOfStockItems: () => {},
    setDiscountedPrice: () => {},
    updateItemQuantity: () => {},
    setDiscountedCode: () => {},
    isOrderConfirmed: false,
    setIsOrderConfirmed: () => {},
})

export const CartProvider = ({ children }) => {
    const toast = useToast()
    const [discountedPrice, setDiscountedPrice] = useState(0) // [1
    const [cartItems, setCartItems] = useState([])
    const [outOfStockItems, setOutOfStockItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [discountedCode, setDiscountedCode] = useState('')
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)

    useEffect(() => {
        async function fetchCart() {
            await getUserCart().then((res) => {
                setCartItems(res.data.data.cart)
                setCartCount(
                    res.data.data.cart.length +
                        res.data.data.out_of_stock.length
                )
                setCartTotal(res.data.data.total)
                setOutOfStockItems(res.data.data.out_of_stock)
            })
        }
        fetchCart()
    }, [])
    const addItemToCart = async ({ item, type, setComponentTotal, setComponents, addType }) => {
        await addToCart({ item , addType})
            .then((res) => {
                if(res.data.data.length > 0){
                    res.data.data.map((item) => {
                        toast({
                            title: `Error for ${item.item}`,
                            description: `${item.message}`,
                            status: "error",
                            duration: 2000,
                            isClosable: true,
                        })
                    })
                } else {
                    if(type !== 'builder'){
                        toast({
                            title: 'Success',
                            description: 'Item added to cart',
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                        })
                    }else{
                        toast({
                            title: 'Success',
                            description: 'Build added to cart',
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                        })
                        setComponentTotal(0);
                        setComponents(defaultComponentValue);
                    }
                    getUserCart().then((res) => {
                        setCartItems(res.data.data.cart)
                        setCartTotal(res.data.data.total)
                        setDiscountedCode('');
                        setDiscountedPrice(0);
                        setCartCount(res.data.data.cart.length + res.data.data.out_of_stock.length)
                    })

                }
            })
            .catch((err) => {
                if (err.response.data.message === 'Token is invalid') {
                    toast({
                        title: 'Error',
                        description:
                            'You must login first to add this item to cart',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    })
                }
            })
    }
    // const addMultipleItemsToCart = async ({ items, type }) => {
    //     await addToCart
    // }
    const clearCart = async () => {
        await removeAllItemsFromCart()
        setCartCount(0)
        await getUserCart().then((res) => {
            setCartItems(res.data.data.cart)
            setCartTotal(res.data.data.total)
            setOutOfStockItems(res.data.data.out_of_stock)
            setDiscountedPrice(0)
            setDiscountedCode('')
        })
    }
    const removeItemFromCart = async ({ item }) => {
        await updateCart({ item: item, quantity: 0 }).then((res) => {
            setCartItems(res.data.data.cart)
            setOutOfStockItems(res.data.data.out_of_stock)
            setCartCount(cartCount - 1)
            setCartTotal(res.data.data.total)
            setDiscountedPrice(0)
            setDiscountedCode('')
        })
    }
    const updateItemQuantity = async ({ item, quantity }) => {
        await updateCart({ item: item, quantity: quantity }).then((res) => {
            if (
                res.data.data &&
                res.data.data.message ===
                    'Quantity is greater than stock quantity'
            ) {
                toast({
                    title: 'Error',
                    description: res.data.data.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            } else {
                setCartItems(res.data.data.cart)
                setOutOfStockItems(res.data.data.out_of_stock)
                setCartTotal(res.data.data.total)
            }
        })
    }
    const value = {
        addItemToCart,
        clearCart,
        removeItemFromCart,
        removeAllItemsFromCart,
        outOfStockItems,
        cartItems,
        cartCount,
        cartTotal,
        discountedPrice,
        discountedCode,
        setCartTotal,
        setCartItems,
        setCartCount,
        setOutOfStockItems,
        setDiscountedPrice,
        updateItemQuantity,
        setDiscountedCode,
        isOrderConfirmed,
        setIsOrderConfirmed,
    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
