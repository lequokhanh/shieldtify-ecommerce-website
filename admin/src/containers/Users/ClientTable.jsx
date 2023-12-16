import { 
    Flex, 
    HStack, 
    Image, 
    Popover, 
    PopoverContent, 
    PopoverTrigger, 
    Table, 
    TableContainer, 
    Tbody, 
    Td, 
    Text, 
    Th, 
    Thead, 
    Tr } from "@chakra-ui/react";
import { useContext } from "react";
import pen from '../../assets/users/pen.svg';
import { UsersContext } from "../../context/users.context";
import EditPopOverContent from "./EditPopOverContent";


const ClientTable = () => {
    const { clients } = useContext(UsersContext);
    return (
        <TableContainer borderRadius='12px' border="1px solid #F3F4F6" mt="18px">
            <Table variant="simple">
                <Thead>
                    <Tr bgColor="#F3F4F6">
                        <Th color="shieldtify.checkout" fontSize="1.125rem" fontWeight="600" textAlign="center">
                            DISPLAY NAME
                        </Th>
                        <Th color="shieldtify.checkout" fontSize="1.125rem" fontWeight="600" >
                            USERNAME
                        </Th>
                        <Th color="shieldtify.checkout" fontSize="1.125rem" fontWeight="600">
                            EMAIL
                        </Th>
                    </Tr>
                </Thead>
                <Tbody fontFamily="Inter">
                    {
                        clients && clients.length > 0 && clients.map((client,index) => (
                            <Tr key={client.uid} bg={(index % 2) ? "#F3F4F6" : "#FFFFFF"}>
                                <Td> 
                                    <HStack gap="40px">
                                        <Text color="shieldtify.checkout" fontWeight="400"> 
                                            {client.display_name}
                                        </Text>
                                    </HStack>
                                </Td>
                                <Td>
                                    <Text color="shieldtify.checkout" fontWeight="400"> 
                                        {client.username}
                                    </Text>
                                </Td>
                                <Td colSpan="2">
                                    <Flex justifyContent="space-between">
                                        <Text color="shieldtify.checkout" fontWeight="400"> 
                                            {client.email}
                                        </Text>
                                        <Popover>
                                            {({onClose}) => (
                                            <>
                                                <PopoverTrigger >
                                                    <Flex as="button">
                                                        <Image src={pen} alt="pen" _hover={{cursor:"pointer"}} onClick={onClose}/>
                                                    </Flex>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <EditPopOverContent type="user" id={client.uid}/>
                                                </PopoverContent>
                                            </>
                                            )}
                                        </Popover>
                                    </Flex>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default ClientTable;