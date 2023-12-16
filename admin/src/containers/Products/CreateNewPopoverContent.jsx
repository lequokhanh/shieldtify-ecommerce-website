import { 
    Flex, 
    HStack, 
    PopoverArrow,
    Image,
    Text
} from "@chakra-ui/react";
import NewProduct from "../../assets/NewProduct.svg";
import NewCategory from "../../assets/NewCategory.svg";
import { useNavigate } from "react-router-dom";

const CreateNewPopoverContent = ({setIsCategoryEditOpen,setEditType}) => {
    const navigate = useNavigate();
    return (
    <>
        <PopoverArrow/>
        <Flex flexDir="column" gap="16px" padding="20px 16px" fontFamily="Inter">
            <HStack 
            gap="8px"
            padding="8px 70px 8px 16px"
            _hover={{
                cursor: "pointer",
                bgColor: "#E1E1E1",
                borderRadius: "9px"
            }}
            onClick={() => {
                navigate("/manage/products/edit/new")
            }}
            >
                <Image src={NewProduct} alt="New Product"/>
                <Text fontSize="0.875rem" fontWeight="700">
                    Product
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
            onClick={() => {
                setIsCategoryEditOpen(true);
                setEditType("Create");
            }}
            >
                <Image src={NewCategory} alt="New Category"/>
                <Text fontSize="0.875rem" fontWeight="700">
                    Category
                </Text>
            </HStack>
        </Flex>
    </>
    )
};

export default CreateNewPopoverContent;