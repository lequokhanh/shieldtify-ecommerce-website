import {
    Flex,
    Heading,
    HStack,
    Button,
    Text,
    Box,
    Divider,
} from "@chakra-ui/react";
import SearchInput from "../../components/SearchInput";
import { useContext, useEffect } from "react";
import { UsersContext } from "../../context/users.context";
import { getAllClients, getAllStaffs } from "../../utils/api";
import { AddIcon } from "@chakra-ui/icons";
import ClientTable from "./ClientTable";
import StaffTable from "./StaffTable";
import Pagination from "../../components/Pagination";
import CreateStaffModal from "./CreateStaffModal";

const Users = () => {
    const { 
        setSearchValue, 
        isOnClient, 
        totalUsers, 
        setIsOnClient, 
        setClients, 
        setStaffs, 
        setTotalUsers,
        setTotalPages,
        setCurrentPage,
        currentPage,
        totalPages,
        searchValue,
        setIsCreateOpen
    } = useContext(UsersContext);
    const handleClientClick = () => {
        setIsOnClient(true);
    }
    const handleStaffClick = () => {
        setIsOnClient(false);
    }
    async function fetchData() {
        if(!isOnClient){
            await getAllStaffs({page:currentPage,keyword:searchValue}).then(res => {
                
                setStaffs(res.data.data.rows);
                setTotalPages(Math.ceil(res.data.data.count / 10));
                setTotalUsers(res.data.data.count);
                
            })
        }else{
            await getAllClients({page:currentPage,keyword:searchValue}).then(res => {
                setClients(res.data.data.rows);
                setTotalPages(Math.ceil(res.data.data.count / 10));
                setTotalUsers(res.data.data.count);
            })
        }
    }
    useEffect(() => {
        fetchData();
    },[isOnClient,currentPage,searchValue]);
    useEffect(() => {
        setCurrentPage(1);
    },[searchValue])
    useEffect(() => {
        setSearchValue('');
        setCurrentPage(1);
    },[isOnClient])
    return (    
        <Flex flexDir="column" padding="24px 34px" w="full" gap="30px">
            <Flex justifyContent="space-between" fontFamily="Inter">
                <Heading fontSize="2rem" fontWeight="700" color="shieldtify.checkout">Users</Heading>
                <HStack  gap="18px">
                    <SearchInput setSearchValue={setSearchValue} searchValue={searchValue} setCurrentPage={setCurrentPage}/>
                    {
                        !isOnClient && (
                            <Button 
                            color="#FFFFFF"
                            colorScheme="blackAlpha"
                            bgColor="#444444" 
                            border="1px solid #BDC1CA"
                            boxShadow="0px 2px 5px 0px rgba(23, 26, 31, 0.09), 0px 0px 2px 0px rgba(23, 26, 31, 0.12)"
                            borderRadius="12px"
                            padding="7px 15px 7px 12px"
                            onClick={() => {
                                setIsCreateOpen(true);
                            }}
                            >
                                <HStack>
                                    <AddIcon/>
                                    <Text
                                    fontSize="14px"
                                    fontWeight="400"
                                    >
                                        New account
                                    </Text>
                                </HStack>
                            </Button>
                        )
                    }
                </HStack>
            </Flex>
            <Flex  fontFamily="Inter">
                <Flex w="full" flexDir="column">
                    <Flex alignItems="flex-end">
                        <Box 
                        paddingX="22px" 
                        paddingBottom="5px"
                        onClick={handleClientClick}
                        style={{
                            borderBottom: isOnClient ? "2px solid #444444" : "",
                            borderRadius: isOnClient ? "2px 2px 0px 0px" : ""
                        }}
                        _hover={{cursor: "pointer"}}
                        >
                            <Text fontSize="0.875rem" fontWeight={isOnClient ? "700" : "400"} color="#565D6D">
                                Client
                            </Text>
                        </Box>
                        <Box 
                        paddingX="22px" 
                        onClick={handleStaffClick} 
                        _hover={{cursor: "pointer"}}
                        paddingBottom="5px"
                        style={{
                            borderBottom: !isOnClient ? "2px solid #444444" : "",
                            borderRadius: !isOnClient ? "2px 2px 0px 0px" : ""
                        }}
                        >
                            <Text fontSize="0.875rem" fontWeight={!isOnClient ? "700" : "400"} color="#565D6D">
                                Staff
                            </Text>
                        </Box>
                    </Flex>
                    <Divider w="full"/>
                </Flex>
            </Flex>
            <Box>
                <Text>
                    <Text as="span" fontWeight="700">{totalUsers}</Text> in total
                </Text>
            </Box>
            <Flex>
                <Box display={!isOnClient && "none"} w="full">
                    <ClientTable/>
                </Box>
                <Box display={isOnClient && "none"} w="full">
                    <StaffTable fetchData={fetchData}/>
                </Box>
            </Flex>
            <Flex justifyContent="flex-end">
                <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                setCurrentPage={setCurrentPage}
                />
            </Flex>
            <CreateStaffModal/>
        </Flex>
    )
};

export default Users;