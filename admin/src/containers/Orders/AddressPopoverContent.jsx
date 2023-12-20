import { 
    Radio,
    PopoverArrow,
    RadioGroup,
    Flex,
} from "@chakra-ui/react";

const AddressPopoverContent = ({currentUserAddresses,onClose,setSelectedAddress,selectedAddress }) => {
    const handleRadioChange = (value) => {
        const address = currentUserAddresses.find(add => add.uid === value);
        setSelectedAddress(address);
        onClose();
    }
    return (
    selectedAddress && currentUserAddresses && (
    <>
        <PopoverArrow/>
        <RadioGroup
        // defaultValue={order && order.shipping_address && order.shipping_address.uid}
        value={selectedAddress.uid}
        onChange={handleRadioChange}
        >
            <Flex flexDir="column" gap="12px" padding="31px 23px 19px 22px">
                {
                    currentUserAddresses && currentUserAddresses.map((add, index) => (
                        <Radio 
                        key={index} 
                        value={add.uid}
                        colorScheme="blackAlpha"
                        borderColor="#D9D9D9"
                        fontSize="0.9375rem"
                        fontWeight="400"
                        color="#000000"
                        box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                        >
                            {add.address}
                        </Radio>
                    ))
                }
            </Flex>
        </RadioGroup>
    </>
    )
    )
}

export default AddressPopoverContent;