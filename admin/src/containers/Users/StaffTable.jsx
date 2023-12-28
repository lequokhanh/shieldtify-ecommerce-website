import { 
    Box,
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
import { useContext, useState } from "react";
import pen from '../../assets/users/pen.svg';
import { UsersContext } from "../../context/users.context";
import EditPopOverContent from "./EditPopOverContent";
import EditStaffModal from "./EditStaffModal";


const StaffTable = ({fetchData}) => {
    const { staffs } = useContext(UsersContext);
    const [selectedStaff, setSelectedStaff] = useState(null);
    return (
        <>
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
                                Role
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody fontFamily="Inter">
                        {
                            staffs && staffs.length > 0 && staffs.map((staff,index) => (
                                <Tr key={staff.uid} bg={(index % 2) ? "#F3F4F6" : "#FFFFFF"}>
                                    <Td> 
                                        <HStack gap="40px">
                                            <Text color="shieldtify.checkout" fontWeight="400"> 
                                                {staff.display_name}
                                            </Text>
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <Text color="shieldtify.checkout" fontWeight="400"> 
                                            {staff.username}
                                        </Text>
                                    </Td>
                                    <Td colSpan="2">
                                        <Flex justifyContent="space-between">
                                            <Text color="shieldtify.checkout" fontWeight="400"> 
                                                {staff.role}
                                            </Text>
                                            <Popover placement="bottom-start">
                                                <PopoverTrigger>
                                                    <Box 
                                                    as="button"
                                                    onClick={()=> {
                                                        setSelectedStaff(staff);
                                                    }}
                                                    _hover={{
                                                        cursor: "pointer"
                                                    }}
                                                    >
                                                        <Image src={pen} alt="pen"/>
                                                    </Box>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <EditPopOverContent type="staff" role={staff.role} staff={staff}/>
                                                </PopoverContent>
                                            </Popover>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <EditStaffModal staff={selectedStaff} fetchData={fetchData}/>
        </>
    )
}

export default StaffTable;