import { 
    Flex, 
    Heading,
    HStack,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent, 
} from "@chakra-ui/react";
import SearchInput from "../../components/SearchInput";
import { useContext, useEffect, useState } from "react";
import InfoCard from "../../components/InfoCard";
import canceled from "../../assets/Orders/canceled.svg";
import initiated from "../../assets/Orders/initiated.svg";
import processing from "../../assets/Orders/processing.svg";
import succeeded from "../../assets/Orders/succeeded.svg";
import apps from "../../assets/Products/apps.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import InfoActionPopoverContent from "./InfoActionPopoverContent";
import OrdersTable from "./OrdersTable";
import Pagination from "../../components/Pagination";
import OrderModal from "./OrderModal";
import { getAllOrders, getOrderByClientId } from "../../utils/api";
import { AuthContext } from "../../context/auth.context";

const Orders = () => {
    const [searchValue ,setSearchValue] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredOrder, setFileteredOrder] = useState("All orders");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOrderInfo, setSelectedOrderInfo] = useState({});
    const [orders, setOrders] = useState([]); // [
    const [checkedOrders, setCheckedOrders] = useState([]); // [
    const { isLoggedIn } = useContext(AuthContext);
    const handleFilterClick = (filter) => {
        setFileteredOrder(filter);
    }
    // useEffect(async () => {
    //     if(filteredOrder === "All orders"){
    //         await getAllOrders()
    //     }else
    // },[filteredOrder]);
    const [allOrdersStat, setAllOrdersStat] = useState({
        orderNum: "0",
        info: "0",
    });
    const [succeededOrdersStat, setSucceededOrdersStat] = useState({
        orderNum: "0",
        info: "0",
    });
    const [processingOrdersStat, setProcessingOrdersStat] = useState({
        orderNum: "0",
        info: "0",
    });
    const [canceledOrdersStat, setCanceledOrdersStat] = useState({
        orderNum: "0",
        info: "0",
    });
    const [initiatedOrdersStat, setInitiatedOrdersStat] = useState({
        orderNum: "0",
        info: "0",
    });
    useEffect(() => {
        async function fetchData(){
            await getAllOrders({page:currentPage,keyword:searchValue}).then((res) => {
                setOrders(res.data.data.orders);
                let totalOrder = res.data.data.count.reduce((total, item) => {
                    if (item.order_status !== "canceled"){
                        return total + item.count;
                    }
                },0);
                let totalIncome = res.data.data.count.reduce((total, item) => total + item.total, 0);
                let totalSucceededOrder = res.data.data.count.reduce((total, item) => {
                    if (item.order_status === "succeeded") {
                        return total + item.count;
                    }
                    return total;
                }, 0);
                let totalSucceededIncome = res.data.data.count.reduce((total, item) => {
                    if (item.order_status === "succeeded") {
                        return total + item.total;
                    }
                    return total;
                },0);
                let totalProcessingOrder = res.data.data.count.reduce((total, item) => {
                    if (item.order_status === "processing") {
                        return total + item.count;
                    }
                    return total;
                }, 0);
                let totalProcessingIncome = res.data.data.count.reduce((total, item) => {
                    if (item.order_status === "processing") {
                        return total + item.total;
                    }
                    return total;
                },0);
                let totalCanceledOrder = res.data.data.count.reduce((total, item) => {
                    if (item.order_status === "canceled") {
                        return total + item.count;
                    }
                    return total;
                }, 0);
                let totalCanceledIncome = res.data.data.count.reduce((total, item) => {
                    if (item.order_status === "canceled") {
                        return total + item.total;
                    }
                    return total;
                },0);
                let totalInitiatedOrder = res.data.data.count.reduce((total, item) => {
                    if (item.order_status === "initiated") {
                        return total + item.count;
                    }
                    return total;
                }, 0);
                let totalInitiatedIncome = res.data.data.count.reduce((total, item) => {
                    if (item.order_status === "initiated") {
                        return total + item.total;
                    }
                    return total;
                },0);
                setAllOrdersStat({
                    orderNum:`${totalOrder}`,
                    info:`${totalIncome}`,
                })
                setTotalPages(Math.ceil(totalOrder / 10));
                setSucceededOrdersStat({
                    orderNum: `${totalSucceededOrder}`,
                    info:`${totalSucceededIncome}`,
                })
                setProcessingOrdersStat({
                    orderNum:`${totalProcessingOrder}`,
                    info:`${totalProcessingIncome}`,
                })
                setCanceledOrdersStat({
                    orderNum:`${totalCanceledOrder}`,
                    info:`${totalCanceledIncome}`,
                })
                setInitiatedOrdersStat({
                    orderNum:`${totalInitiatedOrder}`,
                    info:`${totalInitiatedIncome}`,
                })
            })
        }
        if(isLoggedIn){
            fetchData();
        }
    },[currentPage,isLoggedIn,searchValue])
    const handleEditClick =  async ({userId,orderId}) => {
        await getOrderByClientId({userId,orderId}).then((res) => {
            setSelectedOrderInfo(res.data.data);
            setIsEditModalOpen(true);
        })
    }
    return (
        <Flex flexDir="column" padding="24px 34px" w="full" gap="30px">
            <Flex justifyContent="space-between" fontFamily="Inter">
                <Heading fontSize="2rem" fontWeight="700" color="shieldtify.checkout">Orders</Heading>
                <HStack  gap="18px">
                    <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} setCurrentPage={setCurrentPage}/>
                </HStack>
            </Flex>
            <HStack gap="24px">
                <InfoCard filteredOrder={filteredOrder} handleFilterClick={handleFilterClick} name="All orders" info={`$${allOrdersStat.info}`} icon={apps}  bgColor="shieldtify.grey.400" iconColor="#444444" order={allOrdersStat.orderNum} orderColor="#444444" type="order"/>
                <InfoCard filteredOrder={filteredOrder} handleFilterClick={handleFilterClick} name="Succeeded" info={`$${succeededOrdersStat.info}`} icon={succeeded} bgColor="#EEFDF3" iconColor="#1DD75B" order={succeededOrdersStat.orderNum} orderColor="#117B34" type="order"/>
                <InfoCard filteredOrder={filteredOrder} handleFilterClick={handleFilterClick} name="Processing" info={`$${processingOrdersStat.info}`} icon={processing} bgColor="#FEF9EE" iconColor="#D29211" order={processingOrdersStat.orderNum} orderColor="#98690C" type="order"/>
                <InfoCard filteredOrder={filteredOrder} handleFilterClick={handleFilterClick} name="Canceled" info={`$${canceledOrdersStat.info}`} icon={canceled} bgColor="#FDF2F2" iconColor="#DE3B40" order={canceledOrdersStat.orderNum} orderColor="#DE3B40" type="order"/>
                <InfoCard filteredOrder={filteredOrder} handleFilterClick={handleFilterClick} name="Initiated" info={`$${initiatedOrdersStat.info}`} icon={initiated} bgColor="#F3F4F6" iconColor="#9095A1" order={initiatedOrdersStat.orderNum} orderColor="#565D6D" type="order"/>
            </HStack>
            <Flex justifyContent="flex-end">
                <Popover placement="bottom-start">
                    <PopoverTrigger>
                        <HStack 
                        padding="7px 12px" 
                        bgColor="white"  
                        borderRadius="12px" gap="5px" 
                        _hover={{cursor:"pointer"}}
                        border="1px solid #444444"
                        as="button"
                        >
                            <Text fontSize="0.875rem" color="#444444" fontWeight="400">
                                Action
                            </Text>
                            <ChevronDownIcon color="#444444" boxSize="4"/>
                        </HStack>
                    </PopoverTrigger>
                    <PopoverContent>
                        <InfoActionPopoverContent checkedOrders={checkedOrders} handleEditClick={() => {handleEditClick(checkedOrders[0])}}/>
                    </PopoverContent>
                </Popover>
            </Flex>
            <OrdersTable orders={orders} checkedOrders={checkedOrders} setCheckedOrders={setCheckedOrders}/>
            <Flex justifyContent="flex-end">
                <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </Flex>
            <OrderModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} order={selectedOrderInfo}/>
        </Flex>        
    )
};

export default Orders;