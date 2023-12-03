
import { 
    HStack, 
    Text,
    Flex,
    Image,
    Grid,
    Card,
    CardBody,
    VStack,
    Heading,
    useDisclosure
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import map from '../../assets/CheckOut/map.svg';
import flat from '../../assets/CheckOut/flat.svg';
import add from '../../assets/CheckOut/add.svg';
import NewAddressForm from "./NewAddressForm";
import AddressCard from "../../components/AddressCard";
import ShowMoreModal from "../../components/ShowMoreModal";
import { CheckOutContext } from "../../context/checkout.context";

const Card3 = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { addresses, pushAddress, beingSelected } = useContext(CheckOutContext);
    const [ isCreateAddressOpen, setIsCreateAddressOpen] = useState(false);
        const toggleCreateAddress = () => {
        setIsCreateAddressOpen(!isCreateAddressOpen);
    }
    
    return(
    <Flex
    padding="25px 28px"
    borderRadius="12px"
    border="2px solid #BDC1CA"
    flexDir="column"
    gap="20px"
    >
        <Flex
        flexDir="column"
        gap="20px"
        >
            <HStack gap="8px">
                <Image src={map} w="24px" h="24px"/>
                <Text
                fontSize="1.125rem"
                color="#323743"
                fontWeight="700"
                >
                    Recipient information
                </Text>
            </HStack>
        </Flex>
        <Flex
        flexDir="column"
        gap="5px"
        >
            <Heading
            color="shieldtify.200"
            fontSize="1.125rem"
            fontWeight="500"
            >
                Your addresses
            </Heading>
            <Grid
            gridTemplateColumns="repeat(3,1fr)"
            gap="15px"
            fontFamily="Inter, sans-serif"
            >
                {
                    addresses.map((address) => (
                                address.is_default &&
                                (
                                    beingSelected!=="" ? (
                                        <AddressCard key={beingSelected.uid} add={beingSelected} isShowMoreOpen={isOpen}  isCreateAddressOpen={isCreateAddressOpen} type="being-selected" isSelected={false}/>
                                    ):
                                    (
                                        <AddressCard key={address.uid} add={address} isShowMoreOpen={isOpen} isCreateAddressOpen={isCreateAddressOpen} type="being-selected" isSelected={false}/>
                                    )
                                )
                        
                    ))
                }
                <Card
                variant="checkout"
                direction="row"       
                onClick={onOpen}
                background={
                    isOpen ? "#DEE1E6": "#FFFFFF"
                }
                >
                    <CardBody>
                        <VStack
                        gap="0px"
                        >
                            <Text
                            color="shiedtify.checkout"
                            fontSize="0.75rem"
                            fontWeight="700"
                            >
                                Show more
                            </Text>
                            <Image src={flat} alt="flat" w="24px" h="24px"/>
                        </VStack>
                    </CardBody>
                </Card>
                <Card
                variant="checkout"
                direction="row"        
                onClick={toggleCreateAddress}
                background={
                    isCreateAddressOpen ? "#DEE1E6": "#FFFFFF"
                }
                >
                    <CardBody>
                        <VStack gap="0px">
                            <Text color="shiedtify.checkout" fontSize="0.75rem" fontWeight="700">
                                Create new address
                            </Text>
                            <Image src={add} alt="add" w="24px" h="24px" />
                        </VStack>
                    </CardBody>
                </Card>
            </Grid>
        <ShowMoreModal isOpen={isOpen} onClose={onClose} addresses={addresses} />
        </Flex>
        <NewAddressForm isOpen={isCreateAddressOpen} pushAddress={pushAddress} setIsCreateAddressOpen={setIsCreateAddressOpen}/>
    </Flex>
    )
}

export default Card3;