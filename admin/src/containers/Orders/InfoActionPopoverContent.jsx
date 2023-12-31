import { 
    Flex, 
    HStack,
    Image,
    Text,
    useToast
} from "@chakra-ui/react";
import processorder from "../../assets/Orders/processorder.svg";
import cancelorder from "../../assets/Orders/cancelorder.svg";
import editorder from "../../assets/Orders/editorder.svg";
import { processOrders } from "../../utils/api";


const InfoActionPopoverContent = ({handleEditClick,checkedOrders,fetchData,filteredOrder,reFetchProcessedInfo}) => {
    const toast = useToast();
    const handleProcessClick = async () => {    
        if(checkedOrders.length === 0){
            toast({
                title: "Please select at least one order",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        const ordersIDs = checkedOrders.map((order) => order.orderId);
        await processOrders({checkedOrdersIds: ordersIDs, type: 1}).then((res) => {
            if(res.data.message && res.data.message === "Process orders successfully"){
                toast({
                    title: "Process orders successfully",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }else{
                res.data.data.map((ord) => {
                    if(ord.message !== "Process orders successfully"){
                        toast({
                            title: `Process order ${ord.uid} failed`,
                            description: ord.message,
                            status: "error",
                            duration: 2000,
                            isClosable: true,
                        });
                    }else{
                        toast({
                            title: `Process order ${ord.uid} successfully`,
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                        });
                    }
                })
            }
            fetchData();
            reFetchProcessedInfo(1);
        }).catch((err) => {
            console.log(err);
            toast({
                title: "Process orders failed",
                description: err.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        });
    }
    const handleCancelClick = async () => {
        if(checkedOrders.length === 0){
            toast({
                title: "Please select at least one order",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        const ordersIDs = checkedOrders.map((order) => order.orderId);
        await processOrders({
            checkedOrdersIds: ordersIDs,
            type: 0
        }).then((res) => {
            if(res.data.message && res.data.message === "Cancel orders successfully"){
                toast({
                    title: "Cancel orders successfully",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }else{
                res.data.data.map((ord) => {
                    if(ord.message !== "Cancel orders successfully"){
                        toast({
                            title: `Cancel order ${ord.uid} failed`,
                            description: ord.message,
                            status: "error",
                            duration: 2000,
                            isClosable: true,
                        });
                    }else{
                        toast({
                            title: `Cancel order ${ord.uid} successfully`,
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                        });
                    }
                
                })
            }
            fetchData();
            reFetchProcessedInfo(0);
        }).catch((err) => {
            toast({
                title: "Cancel orders failed",
                description: err.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        });
    }
    return (
        <>
            {/* {(!(filteredOrder === "Succeed" || filteredOrder === "Canceled")) && ( */}
                <Flex
                    flexDir="column"
                    gap="16px"
                    padding="16px 7px"
                    fontFamily="Inter"
                >
                    { 
                        !(filteredOrder === "Succeed" || filteredOrder === "Canceled") && (
                            <>
                                <HStack
                                    gap="8px"
                                    padding="8px 70px 8px 16px"
                                    _hover={{
                                        cursor: "pointer",
                                        bgColor: "#E1E1E1",
                                        borderRadius: "9px"
                                    }}
                                    onClick={handleProcessClick}
                                >
                                    <Image src={processorder} alt="Process order" />
                                    <Text fontSize="0.875rem" fontWeight="700">
                                        Process
                                    </Text>
                                </HStack>
                                <HStack
                                    gap="8px"
                                    padding="8px 70px 8px 16px"
                                    _hover={{
                                        cursor: "pointer",
                                        bgColor: "#E1E1E1",
                                        borderRadius: "9px"
                                    }}
                                    onClick={handleCancelClick}
                                >
                                    <Image src={cancelorder} alt="Cancel order" />
                                    <Text fontSize="0.875rem" fontWeight="700">
                                        Cancel
                                    </Text>
                                </HStack>
                            </>
                        )
                    }
                    {checkedOrders.length === 1 && (
                        <HStack
                            gap="8px"
                            padding="8px 70px 8px 16px"
                            _hover={{
                                cursor: "pointer",
                                bgColor: "#E1E1E1",
                                borderRadius: "9px"
                            }}
                            onClick={handleEditClick}
                        >
                            <Image src={editorder} alt="Edit & view order" />
                            <Text fontSize="0.875rem" fontWeight="700">
                                Edit & view
                            </Text>
                        </HStack>
                    )}
                </Flex>
            {/* )} */}
        </>
    );
}

export default InfoActionPopoverContent;