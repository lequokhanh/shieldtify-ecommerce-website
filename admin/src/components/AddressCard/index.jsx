import { Card, Image, CardBody, Flex, Text, IconButton } from '@chakra-ui/react'
import confirmed from '../../assets/Users/confirmed.svg'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
const AddressCard = ({
    add,
    onClick,
    isSelected,
    isCreateAddressOpen,
    type,
    isShowMoreOpen,
    setSelectedAddress,
    setIsAddressModalOpen,
    setIsDeleteModalOpen
}) => {
    return (
        <Card
            variant="checkout"
            direction="row"
            onClick={onClick}
            style={{
                backgroundColor:
                    (!isCreateAddressOpen &&
                        (!isShowMoreOpen || isShowMoreOpen == undefined) &&
                        type === 'being-selected') ||
                    isSelected
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
            gap="10px"
        >
            {type !== 'profile' && (
                <Image src={confirmed} alt="confirmed" w="24px" h="24px" />
            )}
            <CardBody
                alignItems="flex-start"
                justifyItems="flex-start"
                padding="15px 8px"
            >
                <Flex flexDir={'row'} alignItems={'center'} gap="20px">
                    <Flex flexDir="column" whiteSpace="nowrap" w="140px">
                        <Text
                            color="shieldtify.checkout"
                            fontSize="0.75rem"
                            fontWeight="700"
                        >
                            {add.is_default && 'Default address'}
                        </Text>
                        <Text
                            color="shieldtify.checkout"
                            fontSize="0.75rem"
                            isTruncated
                        >
                            {add.address}
                        </Text>
                        <Text color="shieldtify.checkout" fontSize="0.75rem">
                            {add.city}
                        </Text>
                        <Text color="shieldtify.checkout" fontSize="0.75rem">
                            {add.province}
                        </Text>
                        <Text color="shieldtify.checkout" fontSize="0.75rem">
                            {add.phone_number}
                        </Text>
                    </Flex>
                    {type === 'profile' && (
                        <Flex
                            flexDir={'column'}
                            alignItems={'flex-end'}
                            gap="17px"
                        >
                            <IconButton
                                colorScheme="whiteAlpha"
                                justifyContent={'flex-end'}
                                icon={
                                    <DeleteIcon
                                        color="#9095A1"
                                        boxSize={4}
                                        _hover={{
                                            color: '#DE3B40',
                                        }}
                                    />
                                }
                                display="contents"
                                onClick={() => {
                                    setIsDeleteModalOpen(true)
                                    setSelectedAddress(add)
                                }}
                            />
                            <IconButton
                                colorScheme="whiteAlpha"
                                justifyContent={'flex-end'}
                                display="contents"
                                icon={
                                    <EditIcon
                                        color="#9095A1"
                                        boxSize={4}
                                        _hover={{
                                            color: '#379AE6',
                                        }}
                                    />
                                }
                                onClick={() => {
                                    setIsAddressModalOpen(true)
                                    setSelectedAddress(add)
                                }}
                            />
                        </Flex>
                    )}
                </Flex>
            </CardBody>
        </Card>
    )
}

export default AddressCard
