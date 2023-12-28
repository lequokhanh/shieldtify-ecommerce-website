import { ArrowBackIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    HStack,
    Input,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    Radio,
    RadioGroup,
    Text,
    Heading,
    useToast
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as router from 'react-router-dom'
import { ProductsContext } from "../../context/products.context";
import ProductSpecification from "./ProductSpecification";
import ProductsImages from "./ProductImages";
import { getProduct, getALlBrands, getALlCategories } from "../../utils/api";
import ProductDescription from "./ProductDescription";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteCreatable,
} from '@choc-ui/chakra-autocomplete';


const EditProducts = () => {
    const [product, setProduct] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentProductName, setCurrentProductName] = useState("");
    const [currentStock, setCurrentStock] = useState("");
    const [currentBrand, setCurrentBrand] = useState("");
    const [currentPrice, setCurrentPrice] = useState("");
    const [currentImgs, setCurrentImgs] = useState([]);
    const [imgUpdateState, setImgUpdateState] = useState({
        addedImgs: [],
        primaryImg: ""
    });
    const [currentDescription, setCurrentDescription] = useState("");
    const [currentSpecification, setCurrentSpecification] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");   
    const { id } = useParams();
    const { categories, 
        callUpdateProduct, 
        callUpdateProductStaff, 
        callCreateNewProduct,
        allBrandsName,
        setAllBrands,
        setAllBrandsName, 
        setCategories 
    } = useContext(ProductsContext);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        async function fetchData(){
            await getProduct(id).then((res) => {
                setProduct(res.data);
                setCurrentProductName(res.data.name);
                setCurrentCategory(res.data.item_category.name);
                setCurrentBrand(res.data.brand.name);
                setCurrentStock(res.data.stock_qty);
                setSelectedCategory(res.data.item_category.name);
                setCurrentPrice(res.data.price);
                setCurrentImgs(res.data.imgs);
                setCurrentDescription(res.data.description);
                setCurrentSpecification(JSON.stringify(JSON.parse(res.data.specification),null,4));
            }).catch(() => navigate('/404'));
            if(currentUser && currentUser.role !== "staff"){
                await getALlBrands().then((res) => {
                    setAllBrands(res.data.data);
                    setAllBrandsName(res.data.data.map((brand) => brand.name));
                })
                await getALlCategories().then((res) => {
                    setCategories(res.data);
                });
            }
        }
        if(id!=="new"){
            fetchData();
        }
    },[]);

    return(
        <>
        {
            (product || id ==="new") && (

                <Flex flexDir="column" padding="24px 34px" gap="30px" w="full" fontFamily="Inter">
                    <Flex justifyContent="space-between">
                        <Button
                        w="max-content"
                        colorScheme="blackAlpha"
                        as={router.Link}
                        to="/manage/products"
                        color="#FFFFFF"
                        padding="7px 12px"
                        background="#444444"
                        borderRadius="12px"
                        >
                            <HStack gap="6px">
                                <ArrowBackIcon/>
                                <Text fontSize="0.875rem" fontWeight="400">
                                    Back to products
                                </Text>
                            </HStack>
                        </Button>
                        <Button 
                        w="max-content" 
                        colorScheme="blue"
                        padding="7px 23px" 
                        bgColor="shieldtify.200" 
                        color="#FFFFFF"
                        textAlign="center"
                        fontSize="0.875rem"
                        fontWeight="400"
                        onClick={() => {
                            let err="";
                            if(currentBrand===""){
                                err="Please select a brand";
                            }
                            else if(selectedCategory===""){
                                err="Please select a category";
                            }
                            else if(currentProductName===""){
                                err="Please enter a product name";
                            }
                            else if(currentPrice===""){
                                err="Please enter a price";
                            }
                            else if(currentStock===""){
                                err="Please enter a stock";
                            }
                            else if(currentCategory===""){
                                err="Please select a category";
                            }
                            if(err!==""){
                                toast({
                                    title: "Error",
                                    description: err,
                                    status: "error",
                                    duration: 3000,
                                    isClosable: true,
                                })
                                return;
                            }                    
                            if(currentUser && currentUser.role === "staff"){
                                callUpdateProductStaff({
                                    product : {
                                        productID: product.uid,
                                        description: currentDescription,
                                    }
                                }).then(() => {
                                    toast({
                                        title: "Product updated.",
                                        description: "We've updated your product.",
                                        status: "success",
                                        duration: 3000,
                                        isClosable: true,
                                    })
                                }).catch(() => {
                                    toast({
                                        title: "Update product failed",
                                        status: "error",
                                        duration: 2000,
                                        isClosable: true,
                                    })
                                })
                                return;
                            }
                            const categoryid = categories.filter(category => category.name === selectedCategory)[0]?.uid || null;
                            if(id === "new"){
                                callCreateNewProduct({
                                    product : {
                                        brand: currentBrand,
                                        categoryid,
                                        description: currentDescription,
                                        name: currentProductName,
                                        price: currentPrice,
                                        specification: currentSpecification,
                                        stock_qty: currentStock,
                                        img: imgUpdateState,
                                    }
                                }).then(() => {
                                    toast({
                                        title: "Product created.",
                                        description: "We've created your product.",
                                        status: "success",
                                        duration: 3000,
                                        isClosable: true,
                                    })
                                })
                            }
                            else{
                                callUpdateProduct({
                                    product : {
                                        productID: product.uid,
                                        brand: currentBrand,
                                        categoryid,
                                        description: currentDescription,
                                        name: currentProductName,
                                        price: currentPrice,
                                        specification: currentSpecification,
                                        stock_qty: currentStock,
                                        img: imgUpdateState,
                                    }
                                }).then(() => {
                                    toast({
                                        title: "Product updated.",
                                        description: "We've updated your product.",
                                        status: "success",
                                        duration: 3000,
                                        isClosable: true,
                                    })
                                })
                            }
                        }}
                        > 
                            Save
                        </Button>
                    </Flex>
                    <Grid templateColumns="repeat(3, 1fr)" gap="47px" fontFamily="Inter">
                        {
                            id !== "new" && (
                                <Flex flexDir="column" gap="8px">
                                    <Text color="#424856" fontSize="0.875rem" fontWeight="700">
                                        Product ID
                                    </Text>
                                    <Box  padding="7px 55px 6px 12px" bgColor="#F3F4F6" borderRadius="12px" minH="34px">
                                        <Text fontSize="0.875rem" fontWeight="400" color="#BDC1CA">
                                            {product.uid}
                                        </Text>
                                    </Box>
                                </Flex>
                            )
                        }
                        <Flex flexDir="column" gap="8px">
                            <Text color="#424856" fontSize="0.875rem" fontWeight="700">
                                Category
                            </Text>
                            <Flex justifyContent="space-between" padding="7px 12px 6px 12px"  minH="34px" bgColor="#F3F4F6" borderRadius="12px" alignItems="center">
                                <Text fontSize="0.875rem" fontWeight="400">
                                    {currentCategory}
                                </Text>
                                {
                                currentUser.role !== "staff" &&
                                <Popover>
                                {({ onClose }) => (
                                    <>
                                        <PopoverTrigger>
                                            <ChevronDownIcon _hover={{cursor: "pointer"}}/>
                                        </PopoverTrigger>
                                        <PopoverContent mt="10px">
                                            <>
                                                <PopoverArrow/>
                                                <RadioGroup
                                                value={selectedCategory}
                                                onChange={setSelectedCategory}
                                                >
                                                    <Flex flexDir="column" gap="12px" padding="31px 23px 19px 22px">
                                                    {
                                                        categories && categories.map((category, index) => (
                                                            <Radio 
                                                            key={index} 
                                                            value={category.name}
                                                            colorScheme="blackAlpha"
                                                            borderColor="#D9D9D9"
                                                            box-shadow="0px 3px 5px 0px rgba(46, 46, 66, 0.08)"
                                                            >
                                                                {category.name}
                                                            </Radio>
                                                        ))
                                                    }
                                                        <Button 
                                                        variant="submit" 
                                                        colorScheme="blackAlpha"
                                                        onClick={() => {
                                                            setCurrentCategory(selectedCategory);
                                                            onClose();
                                                        }}
                                                        >
                                                            Submit
                                                        </Button>
                                                    </Flex>
                                                </RadioGroup>
                                            </>
                                        </PopoverContent>
                                    </>
                                    )}
                                </Popover>
                                }
                            </Flex>
                        </Flex>
                        <FormControl>
                            <Flex flexDir="column" gap="8px">
                                <FormLabel 
                                margin="0" 
                                color="#424856" 
                                fontSize="0.875rem" 
                                fontWeight="700"
                                >
                                    Stock
                                </FormLabel>
                                <Input
                                defaultValue={product.stock_qty}
                                isReadOnly={currentUser && currentUser.role === "staff"}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setCurrentStock(inputValue === "" ? "" : inputValue);
                                }}
                                padding="7px 55px 6px 12px" 
                                bgColor="#F3F4F6" 
                                border="none"
                                borderRadius="12px"
                                fontSize="0.875rem"
                                fontWeight="400"
                                maxH="34px"
                                />
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <Flex flexDir="column" gap="8px">
                                <FormLabel
                                margin="0" 
                                color="#424856" 
                                fontSize="0.875rem" 
                                fontWeight="700"                
                                >
                                    Product name
                                </FormLabel>
                                <Input
                                padding="7px 55px 6px 12px" 
                                bgColor="#F3F4F6" 
                                border="none"
                                isReadOnly={currentUser && currentUser.role === "staff"}
                                defaultValue={product.name}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setCurrentProductName(inputValue === "" ? "" : inputValue);
                                }}
                                borderRadius="12px"
                                fontSize="0.875rem"
                                fontWeight="400"
                                maxH="34px"
                                />
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <Flex flexDir="column" gap="8px">
                                <FormLabel
                                margin="0" 
                                color="#424856" 
                                fontSize="0.875rem" 
                                fontWeight="700" 
                                >
                                    Brand
                                </FormLabel>
                                <AutoComplete
                                placeholder='Start typing...'
                                selectedItems={currentBrand}
                                isReadOnly={currentUser && currentUser.role === "staff"}
                                onChange={(changes) =>{
                                    setCurrentBrand(changes);
                                }}
                                creatable
                                >
                                    <AutoCompleteInput
                                    padding="7px 55px 6px 12px" 
                                    bgColor="#F3F4F6" 
                                    border="none"
                                    value={currentBrand}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        setCurrentBrand(inputValue === "" ? "" : inputValue);
                                    }}
                                    borderRadius="12px"
                                    fontSize="0.875rem"
                                    fontWeight="400"
                                    maxH="34px"
                                    />
                                    <AutoCompleteList >
                                        {
                                            allBrandsName.map((brand, index) => (
                                                <AutoCompleteItem key={index} value={brand} />
                                            ))
                                        }
                                        <AutoCompleteCreatable/>            
                                    </AutoCompleteList>
                                </AutoComplete>
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <Flex flexDir="column" gap="8px">
                                <FormLabel
                                margin="0" 
                                color="#424856" 
                                fontSize="0.875rem" 
                                fontWeight="700" 
                                >
                                    Price
                                </FormLabel>
                                <Input
                                padding="7px 55px 6px 12px" 
                                bgColor="#F3F4F6" 
                                defaultValue={product.price}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setCurrentPrice(inputValue === "" ? "" : inputValue);
                                }}
                                border="none"
                                borderRadius="12px"
                                fontWeight="400"
                                isReadOnly={currentUser && currentUser.role === "staff"}
                                fontSize="0.875rem"
                                maxH="34px"
                                />
                            </Flex>
                        </FormControl>            
                    </Grid>
                    <Flex gap="47px">
                        <ProductSpecification  role={currentUser.role} spec={currentSpecification} setSpec={setCurrentSpecification}/>
                        <ProductsImages 
                        currentImgs={currentImgs} 
                        setCurrentImgs={setCurrentImgs} 
                        imgUpdateState={imgUpdateState}
                        setImgUpdateState={setImgUpdateState}
                        productID={id}
                        />
                    </Flex>
                    <Flex flexDir="column" gap="8px">
                        <Heading color="#424856" fontSize="0.875rem" fontWeight="700">
                            Description
                        </Heading>
                        <ProductDescription product={product} setCurrentDescription={setCurrentDescription}/>
                    </Flex>
                </Flex>
            )
        }
        </>
    )
}

export default EditProducts;