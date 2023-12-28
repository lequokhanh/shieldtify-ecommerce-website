import { createContext, useState } from "react";
import { resetStaffPassword } from "../utils/api";
import { useToast } from "@chakra-ui/react";

export const UsersContext = createContext({
    searchValue: '',
    setSearchValue: () => {},
    isOnClient: true,
    setIsOnClient: () => {},
    totalUsers: 0,
    setTotalUsers: () => {},
    clients: [],
    setClients: () => {},
    staffs: [],
    setStaffs: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    totalPages: 0,
    setTotalPages: () => {},
    isEditOpen: false,
    setIsEditOpen: () => {},
    isCreateOpen: false,
    setIsCreateOpen: () => {},
    resetStaffPwd: () => {}
});

export const UsersProvider = ({children}) => {
    const [ searchValue, setSearchValue ] = useState('');
    const [ isOnClient, setIsOnClient ] = useState(true);
    const [ totalUsers, setTotalUsers ] = useState(0);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ clients, setClients ] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const toast = useToast();
    const resetStaffPwd = async (uid) => {
        console.log(uid);
        await resetStaffPassword({uid}).then(() => {
            toast({
                title: "Reset password successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        }).catch(() => {
            toast({
                title: "Reset password failed",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        })
    }
    const value = {
        searchValue,
        setSearchValue,
        isOnClient,
        setIsOnClient,
        totalUsers,
        setTotalUsers,
        clients,
        setClients,
        staffs,
        setStaffs,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        isEditOpen,
        setIsEditOpen,
        isCreateOpen,
        setIsCreateOpen,
        resetStaffPwd
    }
    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}