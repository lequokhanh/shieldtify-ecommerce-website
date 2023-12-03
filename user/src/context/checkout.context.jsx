import { createContext, useState, useEffect } from 'react'
import { getAddresses } from '../utils/api'
import { checkOut } from '../utils/api'
import { useContext } from 'react'
import { CartContext } from './cart.context'

export const CheckOutContext = createContext({
    paymentMethod: 'Cash',
    setPaymentMethod: () => {},
    deliveryOptions: 'Home delivery',
    setDeliveryOptions: () => {},
    addresses: [],
    setAddresses: () => {},
    pushAddress: () => {},
    selectedAddress: null,
    setSelectedAddress: () => {},
    beingSelected: null,
    setBeingSelected: () => {},
    callCheckOut: () => {},
    orderList: [],
    setOrderList: () => {},
    orderId: '',
    setOrderId: () => {},
    orderTotal: 0,
    setOrderTotal: () => {},
    addressStyle: true,
    setAddressStyle: () => {},
    isCreateAddressOpen: false,
    setIsCreateAddressOpen: () => {},
    isCheckOutClicked: false,
    setIsCheckOutClicked: () => {},
})

export const CheckOutProvider = ({ children }) => {
    const [paymentMethod, setPaymentMethod] = useState('Cash')
    const [deliveryOptions, setDeliveryOptions] = useState('Home')
    const [addresses, setAddresses] = useState([])
    const [orderList, setOrderList] = useState([])
    const [selectedAddress, setSelectedAddress] = useState('')
    const [beingSelected, setBeingSelected] = useState('')
    const [orderId, setOrderId] = useState('')
    const [orderTotal, setOrderTotal] = useState(0)
    const [addressStyle, setAddressStyle] = useState(true)
    const [isCreateAddressOpen, setIsCreateAddressOpen] = useState(false)
    const [ isCheckOutClicked, setIsCheckOutClicked ] = useState(false);
    const {
        discountedCode,
        setCartCount,
        cartItems,
        setCartItems,
        setCartTotal,
        setDiscountedPrice,
        cartTotal,
    } = useContext(CartContext)
    const pushAddress = ({ value, setIsCreateAddressOpen }) => {
        if (value.is_default) {
            const defaultIndex = addresses.findIndex(
                (address) => address.is_default
            )
            console.log(defaultIndex);

            if (defaultIndex !== -1) {
                // Create a copy of the addresses array to avoid mutating state directly
                const updatedAddresses = [...addresses]

                // Update the is_default property to false for the current default address
                updatedAddresses[defaultIndex] = {
                    ...updatedAddresses[defaultIndex],
                    is_default: false,
                }
                // Update the state with the modified addresses array
                setAddresses([...updatedAddresses, value])
                setBeingSelected(value)
                setSelectedAddress(value)
                setIsCreateAddressOpen(false)
            }else{
                setAddresses([value])
                setBeingSelected(value)
                setSelectedAddress(value)
                setIsCreateAddressOpen(false)
            }
        } else {
            setAddresses([...addresses, value])
            setBeingSelected(value)
            setSelectedAddress(value)
            setIsCreateAddressOpen(false)
        }
    }
    useEffect(() => {
        async function fetchData() {
            await getAddresses().then((res) => {
                setAddresses(res.data.data)
                const defaultAddress = res.data.data.find(
                    (address) => address.is_default === true
                )
                setSelectedAddress(defaultAddress)
            })
        }
        fetchData()
    }, [])
    const callCheckOut = async () => {
        setOrderList(cartItems)
        setOrderTotal(cartTotal)
        if (cartItems.length === 0) {
            window.location.href = '/404'
            return null
        }
        await checkOut({
            code: discountedCode,
            payment_method: paymentMethod,
            receive_method: deliveryOptions,
            shipping_addressid: selectedAddress.uid,
        })
            .then((res) => {
                setOrderId(res.data.data.uid)
                setCartItems([])
                setCartCount(0)
                setDiscountedPrice(0)
                setCartTotal(0)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const value = {
        paymentMethod,
        setPaymentMethod,
        deliveryOptions,
        setDeliveryOptions,
        addresses,
        setAddresses,
        pushAddress,
        selectedAddress,
        setSelectedAddress,
        beingSelected,
        setBeingSelected,
        callCheckOut,
        orderList,
        setOrderList,
        orderId,
        setOrderId,
        orderTotal,
        setOrderTotal,
        addressStyle,
        setAddressStyle,
        isCreateAddressOpen,
        setIsCreateAddressOpen,
        isCheckOutClicked,
        setIsCheckOutClicked,
    }

    return (
        <CheckOutContext.Provider value={value}>
            {children}
        </CheckOutContext.Provider>
    )
}
