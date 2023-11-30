import {
    Card,
    Image,
    CardBody,
    Flex,
    Text,
} from "@chakra-ui/react";
import confirmed from '../../assets/CheckOut/confirmed.svg';
const AddressCard = ({add, onClick, isSelected}) => {
    return (
        <Card
        variant="checkout"
        direction="row"
        onClick={onClick}
        style={{
            backgroundColor: isSelected ? '#DEE1E6' : 'white',
            alignItems:"center",
            padding:"16px 20px",
            border:"1px solid #9095A1",
            borderRadius:"12px",
            _hover:{
                cursor: 'pointer',
                transition: 'background-color 0.5s ease',
                backgroundColor: '#DEE1E6',
                boxShadow: "0px 0px 1px 0px rgba(23, 26, 31, 0.07), 0px 0px 2px 0px rgba(23, 26, 31, 0.12)"
            }
        }}
        gap="10px"
        >
            <Image src={confirmed} alt="confirmed" w="24px" h="24px"/>
            <CardBody
            alignItems="flex-start"
            justifyItems="flex-start"
            padding="15px 8px" 
            
            >
                <Flex 
                flexDir="column"
                whiteSpace="nowrap"
                w="140px"
                >
                    <Text
                    color="shieldtify.checkout"
                    fontSize="0.75rem"
                    fontWeight="700"
                    >
                        {add.is_default && "Default address"}
                    </Text>
                    <Text
                    color="shieldtify.checkout"
                    fontSize="0.75rem"
                    isTruncated
                    >
                        {add.address}
                    </Text>
                    <Text
                    color="shieldtify.checkout"
                    fontSize="0.75rem"
                    >
                        {add.city}
                    </Text>
                    <Text
                    color="shieldtify.checkout"
                    fontSize="0.75rem"
                    >
                        {add.province}
                    </Text>
                    <Text
                    color="shieldtify.checkout"
                    fontSize="0.75rem"
                    >
                        {add.phone}
                    </Text>
                    
                </Flex>
            </CardBody>
        </Card>        
    )
};

export default AddressCard;