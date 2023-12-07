import {
    Box,
    Flex,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    TableContainer,
    useToast,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import StatusBadge from './StatusBadge.jsx'
import OrderDetailModal from './OrderDetailModal.jsx'
import { useContext, useEffect, useState } from 'react'
import { getOrders } from '../../utils/api.js'
import { AuthContext } from '../../context/auth.context.jsx'
import { useNavigate } from 'react-router-dom'
const TrackOrders = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [data, setData] = useState([])
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
        }
        async function fetchData() {
            await getOrders().then((res) => {
                setData(res.data.data)
            })
        }
        fetchData()
        setSelectedOrder(null)
    }, [])
    return (
        <Flex mt={'120px'} mb={'250px'} flexDir={'column'} gap={'30px'}>
            <Box>
                <Heading fontSize={'40px'} fontWeight={'800'} color={'#2D2D2D'}>
                    Track Orders
                </Heading>
            </Box>
            <TableContainer borderRadius={'12px'}>
                <Table
                    size={'lg'}
                    width={'full'}
                    variant={'striped'}
                    colorScheme="whiteAlpha"
                >
                    <Thead bgColor={'#F3F4F6'}>
                        <Tr height={'110px'}>
                            <Th>Order ID</Th>
                            <Th>Status</Th>
                            <Th>Receive method</Th>
                            <Th>Payment method</Th>
                            <Th>Date</Th>
                            <Th>Total</Th>
                            <Th>View</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, index) => (
                            <Tr
                                key={index}
                                fontSize={'14px'}
                                fontWeight={'500'}
                            >
                                <Td color={'#0A84FF'}>#{item.uid}</Td>
                                <Td>
                                    <StatusBadge
                                        status={item.order_status}
                                    ></StatusBadge>
                                </Td>
                                <Td>{item.receive_method}</Td>
                                <Td>{item.payment_method}</Td>
                                <Td>
                                    {new Date(
                                        item.order_date
                                    ).toLocaleDateString('en-UK')}
                                </Td>
                                <Td>${item.total}</Td>
                                <Td>
                                    <IconButton
                                        isRound={true}
                                        variant={'solid'}
                                        aria-label="Send email"
                                        icon={<InfoOutlineIcon />}
                                        onClick={() => {
                                            setSelectedOrder(item)
                                            onOpen()
                                        }}
                                    />
                                </Td>
                            </Tr>
                        ))}
                        {selectedOrder ? (
                            <OrderDetailModal
                                isOpen={isOpen}
                                onClose={onClose}
                                order={selectedOrder}
                            ></OrderDetailModal>
                        ) : (
                            ''
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}

export default TrackOrders
