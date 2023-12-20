import { 
    Button, 
    Flex, 
    HStack, 
    Heading, 
    Text,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Divider,
    Box,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import CategoryCreateModal from "./CategoryCreateModal";
import { getALlCategories,getALlBrands,getAllProductByCategory } from "../../utils/api";
import SearchInput from "../../components/SearchInput";
import InfoCard from "../../components/InfoCard";
import apps from "../../assets/Products/apps.svg";
import crown from "../../assets/Products/crown.svg";
import label from "../../assets/Products/label.svg";
import { AddIcon } from "@chakra-ui/icons";
import CreateNewPopoverContent from "./CreateNewPopoverContent";
import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ProductsTable from "./ProductsTable";
import CategoriesTable from "./CategoriesTable";
import ActionPopoverContent from "./ActionPopoverContent";
import ConfirmModal from "../../components/ConfirmModal";
import Pagination from "../../components/Pagination";
import CategoriesPopoverContent from "../../components/CategoriesPopoverContent";
import BrandsPopoverContent from "./BrandsPopoverContent";
import { useState,useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState("CPUCOOLER");
    const [isCategoryEditOpen, setIsCategoryEditOpen] = useState(false);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedProducts, setCheckedProducts] = useState([]);
    const [editType, setEditType] = useState("");
    const { isLoggedIn } = useContext(AuthContext);
    const { isOpen, onClose } = useDisclosure();
    const [unsubmittedCheckedBrands, setUnsubmittedCheckedBrands] = useState([]);
    const toast = useToast();
    const { 
        totalProducts, 
        currentPage, 
        setCurrentPage, 
        totalPages, 
        categories, 
        setSearchValue,
        allBrands,
        setCategories,
        setTotalProducts,
        setAllBrands,
        setAllBrandsName,
        searchValue,
        currentCategories,
        setProducts,
        currentBrands,
        setTotalProductsInCategory,
        setTotalPages,
        setBrands,
        totalProductsInCategory,
        callUpdateProduct,
    } = useContext(ProductsContext);
    useEffect(() => {
        async function fetchData(){
            await getALlCategories().then((res) => {
                setCategories(res.data);
            });
            await getAllProductByCategory({searchValue: "getTotalProducts"}).then((res) => {
                setTotalProducts(res.data.totalItem);
            })
            await getALlBrands().then((res) => {
                setAllBrands(res.data.data);
                const brandNames = res.data.data.map(brand => brand.name);
                setAllBrandsName(brandNames);
            });
        }
        if(isLoggedIn){
            fetchData();
        }
    },[isLoggedIn])
    useEffect(() => {
        async function fetchData(){
            await getAllProductByCategory({category: currentCategories, page: currentPage, brands: currentBrands, searchValue: searchValue}).then((res) => {
                setProducts(res.data.items);
                setTotalProductsInCategory(res.data.totalItem);
                setTotalPages(Math.ceil(res.data.totalItem / 16));
                setBrands(res.data.brands);
            });
        } 
        if(isLoggedIn){
            fetchData();
        }  
    },[currentPage,currentCategories,isLoggedIn,currentBrands,searchValue]);
    const handleDeleteClick = (productID) => {
        callUpdateProduct({
            product : {
                productID,
                stock_qty: 0
            }
        }, "disable").then(() => {
            toast({
                title: "Product has been disabled.",
                status: "success",
                duration: 9000,
                isClosable: true,
            }).catch((err) => {
                toast({
                    title: "Error",
                    description: err.response.data.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            
            })
        });
    }
    const handleProductsClick = () => {
        setIsOnProducts(true);
    }
    const handleCategoriesClick = () => {
        setIsOnProducts(false);
    }
    const { isOnProducts, setIsOnProducts } = useContext(ProductsContext);
    return (
        <Flex flexDir="column" padding="24px 34px" w="full" gap="30px">
            <Flex justifyContent="space-between" fontFamily="Inter">
                <Heading fontSize="2rem" fontWeight="700" color="shieldtify.checkout">Manage Products</Heading>
                <HStack  gap="18px">
                    <SearchInput setSearchValue={setSearchValue} searchValue={searchValue} setCurrentPage={setCurrentPage}/>
                    <Popover placement="bottom-start">
                        <PopoverTrigger>
                            <Button 
                            color="#FFFFFF"
                            colorScheme="blackAlpha"
                            bgColor="#444444" 
                            border="1px solid #BDC1CA"
                            boxShadow="0px 2px 5px 0px rgba(23, 26, 31, 0.09), 0px 0px 2px 0px rgba(23, 26, 31, 0.12)"
                            borderRadius="12px"
                            padding="7px 15px 7px 12px"
                            >
                                <HStack>
                                    <AddIcon/>
                                    <Text
                                    fontSize="14px"
                                    fontWeight="400"
                                    >
                                        New
                                    </Text>
                                </HStack>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <CreateNewPopoverContent setIsCategoryEditOpen={setIsCategoryEditOpen} setEditType={setEditType}/>
                        </PopoverContent>
                    </Popover>
                </HStack>
            </Flex>
            <HStack gap="24px">
                <InfoCard name="Products" icon={apps} info={totalProducts} bgColor="shieldtify.grey.400" iconColor="#444444"/>
                <InfoCard name="Categories" icon={label} info={categories.length && (categories.length)} bgColor="#FDF2F2" iconColor="#FF6262"/>
                <InfoCard name="Brands" icon={crown} info={allBrands && allBrands.length} bgColor="#FEF9EE" iconColor="#D29211"/>
            </HStack>
            <Flex  fontFamily="Inter">
                <Flex w="full" flexDir="column">
                    <Flex justifyContent="space-between">
                        <Flex alignItems="flex-end">
                            <Box 
                            paddingX="22px" 
                            paddingBottom="5px"
                            onClick={handleProductsClick}
                            style={{
                                borderBottom: isOnProducts ? "2px solid #444444" : "",
                                borderRadius: isOnProducts ? "2px 2px 0px 0px" : ""
                            }}
                            _hover={{cursor: "pointer"}}

                            >
                                <Text fontSize="0.875rem" fontWeight={isOnProducts ? "700" : "400"} color="#565D6D">
                                    Products
                                </Text>
                            </Box>
                            <Box 
                            paddingX="22px" 
                            onClick={handleCategoriesClick} 
                            _hover={{cursor: "pointer"}}
                            paddingBottom="5px"
                            style={{
                                borderBottom: !isOnProducts ? "2px solid #444444" : "",
                                borderRadius: !isOnProducts ? "2px 2px 0px 0px" : ""
                            }}
                            >
                                <Text fontSize="0.875rem" fontWeight={!isOnProducts ? "700" : "400"} color="#565D6D">
                                    Categories
                                </Text>
                            </Box>
                        </Flex>
                        <HStack fontFamily="Inter" gap="13px" mb="12px">
                            <Box display={!isOnProducts && "none"}>
                                <Popover>
                                    {({ onClose }) => (
                                        <>
                                            <PopoverTrigger>
                                                <HStack 
                                                padding="7px 12px" 
                                                border="1px solid #444444" 
                                                color="#444444"  
                                                borderRadius="12px" 
                                                as="button"
                                                gap="5px"
                                                _hover={{cursor:"pointer"}}
                                                >
                                                    <Text fontSize="0.875rem" color="#444444"  fontWeight="400">
                                                        Category
                                                    </Text>
                                                    <ChevronDownIcon boxSize="4"/>
                                                </HStack>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <CategoriesPopoverContent close={onClose} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                                            </PopoverContent>
                                        </>
                                    )}
                                </Popover>
                            </Box>
                            <Box display={!isOnProducts && "none"}>
                                <Popover>
                                    <>
                                        <PopoverTrigger>
                                            <HStack 
                                            padding="7px 12px" 
                                            border="1px solid #444444"
                                            borderRadius="12px" 
                                            as="button"
                                            gap="5px"
                                            _hover={{cursor:"pointer"}}
                                            >
                                                <Text fontSize="0.875rem" color="#444444" fontWeight="400">
                                                    Brand
                                                </Text>
                                                <ChevronDownIcon boxSize="4" color="#444444"/>
                                            </HStack>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <BrandsPopoverContent 
                                            unsubmittedCheckedBrands={unsubmittedCheckedBrands}
                                            setUnsubmittedCheckedBrands={setUnsubmittedCheckedBrands}
                                            />
                                        </PopoverContent>
                                    </>
                                </Popover>        
                            </Box>
                            <Popover placement="bottom-start" >
                                <PopoverTrigger>
                                    <HStack 
                                    padding="7px 12px" 
                                    bgColor="shieldtify.200"  
                                    borderRadius="12px" gap="5px" 
                                    _hover={{cursor:"pointer"}}
                                    as="button"
                                    border="1px solid #BDC1CA"
                                    boxShadow="0px 2px 5px 0px rgba(23, 26, 31, 0.09), 0px 0px 2px 0px rgba(23, 26, 31, 0.12)"
                                    >
                                        <Text fontSize="0.875rem" color="#FFFFFF" fontWeight="400">
                                            Action
                                        </Text>
                                        <ChevronDownIcon color="#FFFFFF" boxSize="4"/>
                                    </HStack>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <ActionPopoverContent 
                                    setIsCategoryEditOpen={setIsCategoryEditOpen}
                                    handleDeleteClick={handleDeleteClick} 
                                    checkedCategories={checkedCategories}
                                    setCheckedCategories={setCheckedCategories}
                                    checkedProducts={checkedProducts} 
                                    isOnProducts={isOnProducts}
                                    setEditType={setEditType}
                                    />
                                </PopoverContent>
                            </Popover>                    
                        </HStack>
                    </Flex>
                    <Divider w="full"/>
                    <Flex>
                        <Box display={!isOnProducts && "none"} w="full">
                            <ProductsTable setCheckedProducts={setCheckedProducts} checkedProducts={checkedProducts}/>
                            <HStack justifyContent="space-between" fontFamily="Inter" mt="25px">
                                <Text fontSize="0.875rem" fontWeight="400" color="shieldtify.checkout">
                                    Total <Text as="span" fontWeight="700">{totalProductsInCategory}</Text> products in this category
                                </Text>
                                <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                baseUrl="/manage/products" 
                                setCurrentPage={setCurrentPage}
                                />
                            </HStack>
                        </Box>
                        <Box  display={isOnProducts && "none"} w="full">
                            <CategoriesTable checkedCategories={checkedCategories} setCheckedCategories={setCheckedCategories}/>
                            <HStack justifyContent="space-between" fontFamily="Inter" mt="25px">
                                <Text fontSize="0.875rem" fontWeight="400" color="shieldtify.checkout">
                                    Total <Text as="span" fontWeight="700">{categories && categories.length}</Text> categories
                                </Text>
                            </HStack>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            <ConfirmModal 
            isOpen={isOpen} 
            onClose={onClose}
            />   
            <CategoryCreateModal 
            isOpen={isCategoryEditOpen} 
            onClose={() => setIsCategoryEditOpen(false)}
            checkedCategory={checkedCategories.length === 1 && checkedCategories[0]}
            editType={editType}
            />
        </Flex>
    )
};

export default Products;