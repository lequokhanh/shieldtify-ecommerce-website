import {
    Flex,
    HStack,
    Image,
    Text,
    useToast
} from "@chakra-ui/react"
import edit from "../../assets/Products/Edit.svg"
import { useNavigate } from "react-router-dom"
import { NotAllowedIcon } from "@chakra-ui/icons"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"

const ActionPopoverContent = ({handleDeleteClick,checkedCategories,checkedProducts,isOnProducts,setIsCategoryEditOpen,setEditType}) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const toast = useToast();
    return (
        <>
            <Flex flexDir="column" gap="5px" padding="16px 14px" fontFamily="Inter" > 
                {
                    (( !isOnProducts &&checkedCategories.length <= 1) || (isOnProducts && checkedProducts.length <= 1)) && (
                        <HStack 
                        gap="8px"
                        padding="8px 70px 8px 16px"
                        _hover={{
                            cursor: "pointer",
                            bgColor: "#E1E1E1",
                            borderRadius: "9px"
                        }}
                        onClick={() => {
                            if(currentUser && currentUser.role && currentUser.role !== "superadmin" && currentUser.role !== "admin" && !isOnProducts){
                                toast({
                                    title: "You don't have permission to edit categories",
                                    status: "error",
                                    duration: 3000,
                                    isClosable: true,
                                });
                                return;
                            }
                            if ((isOnProducts && checkedProducts.length === 0) || (!isOnProducts && checkedCategories.length === 0)) {
                                toast({
                                    title: 'Error',
                                    description: 'No item/category is selected',
                                    status: 'error',
                                    duration: 2000,
                                    isClosable: true,
                                });
                                return;
                            }
                            // setCheckedCategories([]);
                            // setCheckedProducts([]);
                            isOnProducts ? navigate(`/manage/products/edit/${checkedProducts[0]}`) : (() => {
                                setIsCategoryEditOpen(true);
                                setEditType("Edit");
                            })();
                        }}
                        >
                            <Image w="24px" h="24px" src={edit} alt="Edit & View"/>
                            <Text fontSize="0.875rem" fontWeight="700">
                                Edit & View
                            </Text>
                        </HStack>
                    )
                }
                {
                    (isOnProducts && (currentUser && currentUser.role) && (currentUser.role === "admin" || currentUser.role === "superadmin")) && (

                        <HStack 
                        gap="8px"
                        padding="8px 50px 8px 16px"
                        _hover={{
                            cursor: "pointer",
                            bgColor: "#E1E1E1",
                            borderRadius: "9px"
                        }}
                        onClick={() => {
                            if(( isOnProducts && checkedProducts.length === 0) || (!isOnProducts && checkedCategories.length === 0)){
                                toast({
                                    title: 'Error',
                                    description:
                                        'No item/category is selected',
                                    status: 'error',
                                    duration: 2000,
                                    isClosable: true,
                                })
                                return;
                            }
                            handleDeleteClick(checkedProducts);
                        }}
                        >
                            <NotAllowedIcon boxSize={6}/>
                            <Text fontSize="0.875rem" fontWeight="700"
                            >
                                Disable
                            </Text>
                        </HStack>
                    )
                }
            </Flex>
        </>
        )
}

export default ActionPopoverContent;