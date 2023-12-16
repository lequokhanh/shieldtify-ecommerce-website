import {
    Flex,
    HStack,
    Image,
    Text,
    useToast
} from "@chakra-ui/react"
import rmove from "../../assets/Products/rmove.svg"
import edit from "../../assets/Products/Edit.svg"
import { useNavigate } from "react-router-dom"

const ActionPopoverContent = ({handleDeleteClick,checkedCategories,checkedProducts,isOnProducts,setIsCategoryEditOpen,setEditType}) => {
    const navigate = useNavigate();
    const toast = useToast();
    return (
        <>
            <Flex flexDir="column" gap="16px" padding="16px 14px" fontFamily="Inter">
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
                            <Image src={edit} alt="Edit & View"/>
                            <Text fontSize="0.875rem" fontWeight="700">
                                Edit & View
                            </Text>
                        </HStack>
                    )
                }
                <HStack 
                gap="8px"
                padding="8px 70px 8px 16px"
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
                    handleDeleteClick();
                }}
                >
                    <Image src={rmove} alt="Delete"/>
                    <Text fontSize="0.875rem" fontWeight="700"
                    >
                        Delete
                    </Text>
                </HStack>
            </Flex>
        </>
        )
}

export default ActionPopoverContent;