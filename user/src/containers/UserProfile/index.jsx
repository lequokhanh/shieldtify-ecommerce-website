import {
    Box,
    Flex,
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Grid,
    Text,
    Image,
    Card,
    CardBody,
    VStack,
    useToast,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import add from '../../assets/CheckOut/add.svg'
import AddressCard from '../../components/AddressCard/index.jsx'
import { useEffect, useContext } from 'react'
import { getUser, getAddresses } from '../../utils/api.js'
import { ProfileContext } from '../../context/profile.context'
import AddressModal from '../../components/AddressModal/index.jsx'
import ProfileModal from '../../components/ProfileModal/index.jsx'
import DeleteAddressModal from '../../components/DeleteAddressModal/index.jsx'
import { AuthContext } from '../../context/auth.context.jsx'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const {
        profile,
        setProfile,
        addresses,
        setAddresses,
        setIsProfileOpen,
        selectedAddress,
        setSelectedAddress,
        isAddressOpen,
        setIsAddressOpen,
        isDeleting,
        setIsDeleting,
    } = useContext(ProfileContext)
    const { isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const toast = useToast()
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/sign-in')
            toast({
                title: 'Please sign in to continue',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        async function fetchData() {
            await getUser().then((user) => {
                setProfile(user.data.data)
            })
            await getAddresses().then((add) => {
                setAddresses(add.data.data)
            })
        }
        fetchData()
        setSelectedAddress(null)
        console.log(profile, addresses)
    }, [])
    return (
        <>
            {profile && (
                <Flex
                    mt="150px"
                    mb="150px"
                    color="#171A1F"
                    flexDir={'column'}
                    gap={'40px'}
                    alignItems="flex-start"
                >
                    <Flex flexDir={'column'} gap="16px">
                        <Flex flexDir={'row'} alignItems={'center'} gap="190px">
                            <Box fontSize={'24px'} fontWeight={'700'}>
                                {profile.display_name}
                            </Box>
                            <Flex
                                border={'1px solid #171A1F'}
                                borderRadius="18px"
                                padding={'8px 12px'}
                                alignItems={'center'}
                                gap={'10px'}
                                fontSize={'14px'}
                                fontWeight={'500'}
                                _hover={{
                                    cursor: 'pointer',
                                    color: '#FFFFFF',
                                    backgroundColor: '#545454',
                                }}
                                onClick={() => {
                                    setIsProfileOpen(true)
                                }}
                            >
                                Edit Profile
                                <EditIcon mb="2px" />
                            </Flex>
                        </Flex>
                        <TableContainer>
                            <Table
                                variant="simple"
                                colorScheme="whiteAlpha"
                                size="small"
                            >
                                <Tbody>
                                    <Tr>
                                        <Td
                                            fontWeight={'500'}
                                            textDecoration={'underline'}
                                            width={'100px'}
                                        >
                                            Username:
                                        </Td>
                                        <Td>{profile.username}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td
                                            fontWeight={'500'}
                                            textDecoration={'underline'}
                                        >
                                            Email:
                                        </Td>
                                        <Td>{profile.email}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Flex>
                    <Flex flexDir={'column'} gap="20px">
                        <Box
                            fontWeight={'700'}
                            borderBottom={'4px solid #171A1F'}
                            p="12px"
                            width={'fit-content'}
                        >
                            Addresses
                        </Box>
                        <Grid gridTemplateColumns="repeat(4,1fr)" gap="30px">
                            <Card
                                variant="checkout"
                                direction="row"
                                onClick={() => {
                                    setIsAddressOpen(true)
                                    setSelectedAddress(null)
                                }}
                            >
                                <CardBody>
                                    <VStack gap="5px">
                                        <Text
                                            color="shiedtify.checkout"
                                            fontSize="0.75rem"
                                            fontWeight="700"
                                        >
                                            Create new address
                                        </Text>
                                        <Image
                                            src={add}
                                            alt="add"
                                            w="24px"
                                            h="24px"
                                        />
                                    </VStack>
                                </CardBody>
                            </Card>
                            {addresses &&
                                addresses.map((add) => (
                                    <AddressCard
                                        key={add.uid}
                                        add={add}
                                        type={'profile'}
                                        addresses={addresses}
                                        setAddresses={setAddresses}
                                    />
                                ))}
                            <AddressModal
                                isOpen={isAddressOpen}
                                onClose={() => {
                                    setIsAddressOpen(false)
                                }}
                                address={selectedAddress}
                            ></AddressModal>
                            <DeleteAddressModal
                                isOpen={isDeleting}
                                onClose={() => {
                                    setIsDeleting(false)
                                }}
                                address={selectedAddress}
                            ></DeleteAddressModal>
                            <ProfileModal user={profile}></ProfileModal>
                        </Grid>
                    </Flex>
                </Flex>
            )}
        </>
    )
}

export default UserProfile
