import {
    Flex,
    HStack,
    Image,
    Text,
    useToast,
} from "@chakra-ui/react"
import rmove from "../../assets/Products/rmove.svg"
import edit from "../../assets/Products/Edit.svg"
import { useContext } from "react";
import { UsersContext } from "../../context/users.context";
import { AuthContext } from "../../context/auth.context";
import * as router from 'react-router-dom';


const EditPopOverContent = ({id,handleDeleteClick,type,role}) => {
    const { setIsEditOpen } = useContext(UsersContext);
    const navigate = router.useNavigate();
    const toast = useToast();
    const { currentUser } = useContext(AuthContext);
    return(
        <>
            <Flex flexDir="column" gap="16px" padding="16px 14px" fontFamily="Inter">
                <HStack 
                gap="8px"
                padding="8px 70px 8px 16px"
                _hover={{
                    cursor: "pointer",
                    bgColor: "#E1E1E1",
                    borderRadius: "9px"
                }}
                onClick={() => {
                    if(type==="staff"){
                        if((currentUser && currentUser.role !== "superadmin") && (role ==="superadmin" || role ==="admin")){
                            toast({
                                title: "You don't have permission to edit this user",
                                status: "error",
                                duration: 3000,
                                isClosable: true,
                            })
                        }else{
                            setIsEditOpen(true);
                        }
                    }else{
                        navigate(`/manage/users/edit/${id}`);
                    }
                }}
                >
                    <Image src={edit} alt="Edit & View"/>
                    <Text fontSize="0.875rem" fontWeight="700">
                        Edit & View
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
                    if((currentUser && currentUser.role !== "superadmin") && (role ==="superadmin" || role ==="admin")){
                        toast({
                            title: "You don't have permission to edit this user",
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                        });
                    }
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

export default EditPopOverContent;