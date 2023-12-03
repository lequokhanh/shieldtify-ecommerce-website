import { createContext, useState, useEffect } from 'react';
import { useToast } from "@chakra-ui/react";
import { 
    getUserCart,
    addToCart,
    updateCart,
    removeAllItemsFromCart
} from '../utils/api';

export const CartContext = createContext({
        addItemToCart: () => {},
        clearCart: () => {},
        removeItemFromCart: () => {},
        removeAllItemFromCart: () => {},
        outOfStockItems: [],
        cartItems: [],
        cartCount: 0,
        cartTotal: 0,
        discountedPrice: 0,
        discountedCode: "",
        setCartTotal: () => {},
        setCartItems: () => {},
        setCartCount: () => {},
        setOutOfStockItems: () => {},
        setDiscountedPrice: () => {},
        updateItemQuantity: () => {},
        setDiscountedCode: () => {},
        isOrderConfirmed: false,
        setIsOrderConfirmed: () => {},
});

export const CartProvider = ({children}) => {
    const toast = useToast();
    const [discountedPrice, setDiscountedPrice] = useState(0); // [1
    const [cartItems, setCartItems] = useState([]);
    const [outOfStockItems, setOutOfStockItems] = useState([]); 
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [discountedCode, setDiscountedCode] = useState("");
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    useEffect (() => {
        async function fetchCart(){
            await getUserCart().then((res) => {
                setCartItems(res.data.data.cart);
                setCartCount(res.data.data.cart.length+res.data.data.out_of_stock.length);
                setCartTotal(res.data.data.total);
                setOutOfStockItems(res.data.data.out_of_stock);
            })
        }
        fetchCart();
    },[]);
    const addItemToCart = async ({item}) => {
        const isItemInCart = cartItems.some(cartItem => cartItem.itemid === item.uid);
        
        await addToCart({item:item.uid,quantity:1}).then((res) => {
            if(res.data.data[0]){
                toast({
                    title: "Error",
                    description: res.data.data[0].message ,
                    status: "error",
                    duration: 2000,
                    isClosable: true
                });
            }else{
                toast({
                    title: "Success",
                    description: "Item added to cart",
                    status: "success",
                    duration: 2000,
                    isClosable: true
                })
                getUserCart().then((res) => {
                    setCartItems(res.data.data.cart);
                    setCartTotal(res.data.data.total);
                    setDiscountedCode("");
                    setDiscountedPrice(0);
                });
                if(!isItemInCart){
                    setCartCount(cartCount+1);
                } 
            }
        }).catch((err) => {
            if(err.response.data.message === "Token is invalid"){
                toast({
                    title: "Error",
                    description: "You must login first to add this item to cart",
                    status: "error",
                    duration: 2000,
                    isClosable: true
                })
            }
        });
    }
    const clearCart = async () => {
        await removeAllItemsFromCart();
        setCartCount(0);
        await getUserCart().then((res) => {
            setCartItems(res.data.data.cart);
            setCartTotal(res.data.data.total);
            setOutOfStockItems(res.data.data.out_of_stock);
            setDiscountedPrice(0);
            setDiscountedCode("");

        })
    }
    const removeItemFromCart = async ({item}) => {
        await updateCart({item:item,quantity:0}).then((res) => {
            setCartItems(res.data.data.cart);
            setOutOfStockItems(res.data.data.out_of_stock);
            setCartCount(cartCount-1)
            setCartTotal(res.data.data.total);
            setDiscountedPrice(0);
            setDiscountedCode("");
        })
    }
    const updateItemQuantity = async ({item,quantity}) => {
        await updateCart({item:item,quantity:quantity}).then((res) => {
            if(res.data.data && res.data.data.message === "Quantity is greater than stock quantity"){
                toast({
                    title: "Error",
                    description: res.data.data.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true
                });
            }else{
                setCartItems(res.data.data.cart);
                setOutOfStockItems(res.data.data.out_of_stock);
                setCartTotal(res.data.data.total);
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
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}