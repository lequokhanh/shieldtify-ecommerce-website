import { createContext, useState, useEffect } from 'react';
import { useToast } from "@chakra-ui/react";
import { 
    getUserCart,
    addToCart,
    removeItemFromCart
} from '../utils/api';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const toast = useToast();
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect (() => {
        async function fetchCart(){
            await getUserCart().then((res) => {
                setCartItems(res.data.data.cart);
                setCartCount(res.data.data.cart.length);
                setCartTotal(res.data.data.total);
            })
        }
        fetchCart();
    },[]);
    const addItemToCart = async ({item}) => {
        await addToCart({item:item.uid,quantity:1}).then(() => {
            toast({
                title: "Success",
                description: "Item added to cart",
                status: "success",
                duration: 5000,
                isClosable: true
            })
            getUserCart().then((res) => {
                setCartItems(res.data.data.cart);
            });
            setCartCount(cartCount+1)
            setCartTotal(cartTotal+item.price);

        }).catch((err) => {
            if(err.response.data.message === "Token is invalid"){
                toast({
                    title: "Error",
                    description: "You must login first to add this item to cart",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                })
            }else{
                toast({
                    title: "Error",
                    description: err.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true
                })
            }
        });
    }
    const removeItem = async ({item}) => {
        await removeItemFromCart({item:item});
        await getUserCart().then((res) => {
            setCartItems(res.data.data.cart);
        });
    }
    const value = {
        cartItems,
        cartCount,
        cartTotal,
        setCartTotal,
        setCartItems,
        addItemToCart,
        setCartCount,
        removeItem
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}