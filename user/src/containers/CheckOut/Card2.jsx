import {
    Box,
    Card,
    CardBody,
    Flex,
    HStack,
    Heading,
    Image,
    Radio,
    RadioGroup,
    Text,
} from '@chakra-ui/react'
import money from '../../assets/CheckOut/money.svg'
import confirmed from '../../assets/CheckOut/confirmed.svg'
import truck from '../../assets/CheckOut/truck.svg'
import { useContext } from 'react'
import { CheckOutContext } from '../../context/checkout.context'

const Card2 = () => {
    const {
        deliveryOptions,
        setDeliveryOptions,
        paymentMethod,
        setPaymentMethod,
        setIsInStorePickUp,
    } = useContext(CheckOutContext)
    return (
        <Box padding="25px 28px" borderRadius="12px" border="2px solid #BDC1CA">
            <Flex flexDir="column" gap="20px">
                <Flex gap="8px">
                    <Image src={money} w="24px" h="24px" />
                    <Text fontSize="1.125rem" fontWeight="700" color="#323743">
                        Payment Method
                    </Text>
                </Flex>
                <RadioGroup
                    onChange={setPaymentMethod}
                    value={paymentMethod}
                    fontFamily="Inter, sans-serif"
                >
                    <HStack gap="40px">
                        <Radio
                            colorScheme="blackAlpha"
                            borderColor="#D9D9D9"
                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                            value="Cash"
                        >
                            Cash
                        </Radio>
                        <Radio
                            value="Card"
                            colorScheme="blackAlpha"
                            borderColor="#D9D9D9"
                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                        >
                            Bank transfers
                        </Radio>
                    </HStack>
                </RadioGroup>
                <Flex gap="8px">
                    <Image src={truck} w="24px" h="24px" />
                    <Text fontSize="1.125rem" fontWeight="700" color="#323743">
                        Delivery options
                    </Text>
                </Flex>
                <HStack gap="12px">
                    <Card
                        variant="checkout"
                        direction="row"
                        w="206px"
                        onClick={() => {
                            setDeliveryOptions('Home')
                        }}
                        style={{
                            backgroundColor:
                                deliveryOptions === 'Home'
                                    ? '#DEE1E6'
                                    : 'white',
                            alignItems: 'center',
                            padding: '16px 20px',
                            border: '1px solid #9095A1',
                            borderRadius: '12px',
                            _hover: {
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                                backgroundColor: '#DEE1E6',
                                boxShadow:
                                    '0px 0px 1px 0px rgba(23, 26, 31, 0.07), 0px 0px 2px 0px rgba(23, 26, 31, 0.12)',
                            },
                        }}
                    >
                        <Image
                            src={confirmed}
                            alt="confirmed"
                            w="24px"
                            h="24px"
                        />
                        <CardBody
                            fontFamily="Inter, sans-serif"
                            alignItems="flex-start"
                            justifyItems="flex-start"
                            padding="15px 8px"
                            onClick={() => {
                                setIsInStorePickUp(false)
                            }}
                        >
                            <Flex flexDir="column">
                                <Heading
                                    color="#4444444"
                                    fontSize="0.875rem"
                                    fontWeight="700"
                                >
                                    Home delivery
                                </Heading>
                                <Text
                                    lineHeight="20px"
                                    fontSize="0.75rem"
                                    color="#444444"
                                >
                                    Order will delivery to your address
                                </Text>
                            </Flex>
                        </CardBody>
                    </Card>
                    <Card
                        variant="checkout"
                        direction="row"
                        w="206px"
                        onClick={() => {
                            setDeliveryOptions('In-store')
                        }}
                        style={{
                            backgroundColor:
                                deliveryOptions === 'In-store'
                                    ? '#DEE1E6'
                                    : 'white',
                            alignItems: 'center',
                            padding: '16px 20px',
                            border: '1px solid #9095A1',
                            borderRadius: '12px',
                            _hover: {
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                                backgroundColor: '#DEE1E6',
                                boxShadow:
                                    '0px 0px 1px 0px rgba(23, 26, 31, 0.07), 0px 0px 2px 0px rgba(23, 26, 31, 0.12)',
                            },
                        }}
                    >
                        <Image
                            src={confirmed}
                            alt="confirmed"
                            w="24px"
                            h="24px"
                        />
                        <CardBody
                            fontFamily="Inter, sans-serif"
                            alignItems="flex-start"
                            justifyItems="flex-start"
                            padding="15px 8px"
                            onClick={() => {
                                setIsInStorePickUp(true)
                            }}
                        >
                            <Flex flexDir="column">
                                <Heading
                                    color="#4444444"
                                    fontSize="0.875rem"
                                    fontWeight="700"
                                >
                                    In-store pickup
                                </Heading>
                                <Text
                                    lineHeight="20px"
                                    fontSize="0.75rem"
                                    color="#444444"
                                >
                                    Pick your order at our stores
                                </Text>
                            </Flex>
                        </CardBody>
                    </Card>
                </HStack>
            </Flex>
        </Box>
    )
}

export default Card2
