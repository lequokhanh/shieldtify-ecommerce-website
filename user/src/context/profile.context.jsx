import { createContext, useState } from 'react'
export const ProfileContext = createContext({
    profile: {},
    setProfile: () => {},
    addresses: [],
    setAddresses: () => {},
    isDeleting: false,
    setIsDeleting: () => {},
    isProfileOpen: false,
    setIsProfileOpen: () => {},
    selectedAddress: null,
    setSelectedAddress: () => {},
    isAddressOpen: false,
    setIsAddressOpen: () => {},
})

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({})
    const [addresses, setAddresses] = useState([])
    const [isDeleting, setIsDeleting] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [isAddressOpen, setIsAddressOpen] = useState(false)
    const value = {
        profile,
        setProfile,
        addresses,
        setAddresses,
        isDeleting,
        setIsDeleting,
        isProfileOpen,
        setIsProfileOpen,
        selectedAddress,
        setSelectedAddress,
        isAddressOpen,
        setIsAddressOpen,
    }
    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}
