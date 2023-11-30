import {
    createContext,
    useState,
    useEffect 
} from 'react';
import { getAddresses } from '../utils/api';


export const CheckOutContext = createContext({
    paymentMethod: "Cash",
    setPaymentMethod: () => {},
    deliveryOptions: "Home delivery",
    setDeliveryOptions: () => {},
    addresses: [],
    setAddresses: () => {},
    pushAddres: () => {},
    selectedAddress: null,
    setSelectedAddress: () => {},
    beingSelected: null,
    setBeingSelected: () => {},
})

export const CheckOutProvider = ({children}) => {
    const [paymentMethod , setPaymentMethod] = useState("Cash");
    const [deliveryOptions, setDeliveryOptions] = useState("Home");
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [beingSelected, setBeingSelected] = useState("");
    const pushAddress = (value) => {
        console.log(value);
        if(value.is_default){
            const defaultIndex = addresses.findIndex(address => address.is_default);

            if (defaultIndex !== -1) {
              // Create a copy of the addresses array to avoid mutating state directly
                const updatedAddresses = [...addresses];
        
              // Update the is_default property to false for the current default address
                updatedAddresses[defaultIndex] = {
                ...updatedAddresses[defaultIndex],
                is_default: false
            };
            console.log(updatedAddresses);
        
              // Update the state with the modified addresses array
                setAddresses([...updatedAddresses,value]);
            }
        }else{
            setAddresses([...addresses,value]);
        }
    }
    useEffect(() => {
        async function fetchData(){
            await getAddresses().then((res) => {
                setAddresses(res.data.data);
            })
        }
        fetchData();
    },[]);
    
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
        setBeingSelected
    }

    return (
        <CheckOutContext.Provider value={value}>
            {children}
        </CheckOutContext.Provider>
    )
}