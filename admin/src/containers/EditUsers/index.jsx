import { 
    Box, 
    Flex,
    HStack,
    Text,
    Button,
    useToast,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Td,
    useDisclosure,
    Wrap
} from "@chakra-ui/react"
import AddressCard from "../../components/AddressCard";
import AddressModal from "./AddressModal";
import ConfirmModal from "../../components/ConfirmModal";
import { ArrowBackIcon } from "@chakra-ui/icons";
import * as router from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteAddress } from "../../utils/api";
import { getUserById } from "../../utils/api";
import { EditIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";

const EditUsers = () => {
    const [profile, setProfile] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [isProfileOpen, setIsProfileOpen] = useState(false); //Open confirm modal
    const [selectedAddress, setSelectedAddress] = useState("")
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const { id } = router.useParams();
    const toast = useToast();
    useEffect(() => {
        async function fetchData() {
            await getUserById({id}).then((user) => {
                setAddresses(user.data.data.addresses);
                delete user.data.data.addresses;
                setProfile(user.data.data);
            })
        }
        fetchData()
        setSelectedAddress(null)
    }, []);
    const handleDeleteAddress = async () => {
        await deleteAddress({addID: selectedAddress.uid, userID: id})
            .then(() => {
                setAddresses(
                    addresses.filter(
                        (add) => add.uid !== selectedAddress.uid
                    )
                )
                toast({
                    title: 'Success',
                    description: 'Address deleted successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                onClose()
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: err.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })
    }
    return (
        profile && 
        <Flex flexDir="column" padding="24px 34px" alignItems="flex-start" gap="30px" w="full" fontFamily="Inter">
            <Box>
                <Button
                w="max-content"
                colorScheme="blackAlpha"
                as={router.Link}
                to="/manage/users"
                color="#FFFFFF"
                padding="7px 12px"
                background="#444444"
                borderRadius="12px"
                >
                    <HStack gap="6px">
                        <ArrowBackIcon/>
                        <Text fontSize="0.875rem" fontWeight="400">
                            Back to users
                        </Text>
                    </HStack>
                </Button>
            </Box>
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
                                fontWeight ={'500'}
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
                <Wrap spacing="20px">
                    {
                        addresses.length > 0 && addresses.map((address, index) => (
                            <AddressCard
                            key={index}
                            add={address}
                            type='profile'
                            setIsAddressModalOpen={setIsAddressModalOpen}
                            setSelectedAddress={setSelectedAddress}
                            setIsDeleteModalOpen={onOpen}                            
                            />
                        ))
                    }
                </Wrap>
                <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => {setIsAddressModalOpen(false)}}
                address={selectedAddress}
                addresses={addresses}
                setAddresses={setAddresses}
                userID={id}
                />
                <ConfirmModal
                isOpen={isOpen}
                onClose={onClose}
                handleAction={handleDeleteAddress}
                message="This action will delete your saved address, please check your action carefully."
                />
                <ProfileModal user={profile} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} setProfile={setProfile} />
            </Flex>
        </Flex>
    );
}


export default EditUsers;