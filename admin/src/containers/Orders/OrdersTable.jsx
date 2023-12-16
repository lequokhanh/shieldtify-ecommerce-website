import {
    Box,
    Checkbox,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { ordersTableCategories } from '../../data';

const OrdersTable = ({orders,checkedOrders,setCheckedOrders}) => {
    const handleCheckBoxChange = (value) => {
        if (checkedOrders.some(obj => obj.orderId === value.orderId)) {
            setCheckedOrders(checkedOrders.filter(uid => uid.orderId !== value.orderId));
        } else {
            setCheckedOrders([...checkedOrders, value]);
        }
    }
    const handleCheckALl = (e) => {
        if (e.target.checked) {
            setCheckedOrders(orders.map((order) => ({
                orderId: order.uid,
                userId: order.clientid
            })));
        } else {
            setCheckedOrders([]);
        }
    }
    const handleStatusColor = (status) => {
        let color = "";
        switch (status){
            case "Initiated":
                color="#F3F4F6"
                break;  
            case "Succeeded":
                color="#EEFDF3"
                break;
            case "Processing":
                color="#FEF9EE"
                break;
            case "Canceled":
                color="#FDF2F2"
                break;
            default:
                break;
        }
        return color;
    }
    return (
        <TableContainer borderRadius='12px' border="1px solid #F3F4F6">
            <Table variant="simple">
                <Thead>
                    <Tr bg="#F3F4F6">
                        <Th>
                            <Checkbox
                            colorScheme="blackAlpha"
                            borderRadius='18px'  
                            borderColor="#D9D9D9"
                            bgColor="#FFFFFF"
                            onChange={e => handleCheckALl(e)}
                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                            fontSize="0.9375rem"                         
                            />
                        </Th>
                        {
                            ordersTableCategories.map((category) => (
                                <Th key={category.id} color="shieldtify.checkout" fontWeight="600" fontSize="0.875rem">
                                    {category.name}
                                </Th>
                            ))
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        orders.map((order, index) => (
                            <Tr key={index} bg={(index % 2) ? "#F3F4F6" : "#FFFFFF"} fontFamily="Inter">
                                <Td>
                                    <Checkbox
                                    colorScheme="blackAlpha"
                                    borderRadius='18px'
                                    bgColor="#FFFFFF"
                                    borderColor="#D9D9D9"
                                    box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                                    fontSize="0.9375rem" 
                                    isChecked={checkedOrders.some(obj => obj.orderId === order.uid)}
                                    onChange={() => handleCheckBoxChange({
                                        orderId: order.uid,
                                        userId: order.clientid
                                    })}
                                    />
                                </Td>
                                <Td>
                                    <Text color="#379AE6" fontWeight="400" fontSize="0.875rem"> 
                                        #{order.uid}
                                    </Text>
                                </Td>
                                <Td>
                                    <Box padding="4px 8px" borderRadius="14px" bg={() => handleStatusColor(order.order_status)} w="max-content">
                                        <Text color="#323743" fontWeight="400" fontSize="0.75rem" > 
                                            {order.order_status}
                                        </Text>
                                    </Box>
                                </Td>
                                <Td>
                                    <Text color="shieldtify.checkout" fontWeight="400" fontSize="0.875rem"> 
                                        {order.receive_method}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color="shieldtify.checkout" fontWeight="400" fontSize="0.875rem"> 
                                        {order.payment_method}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color="shieldtify.checkout" fontWeight="400" fontSize="0.875rem"> 
                                        {
                                        new Date(order.order_date).toLocaleDateString('en-UK')
                                        }
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color="shieldtify.checkout" fontWeight="400" fontSize="0.875rem"> 
                                        {order.display_name}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text color="shieldtify.checkout" fontWeight="700" fontSize="0.875rem"> 
                                        ${order.total}
                                    </Text>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default OrdersTable;