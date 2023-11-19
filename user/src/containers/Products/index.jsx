import { 
    Box,
    Image, 
    Text,
    Flex,
    Button,
    Grid,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getAllProductByCategoryOrKeyword } from "../../utils/api";
import { useEffect, useState } from "react";
import { SortCategories } from "../../Categories";
import product_dropdown from "../../assets/Products/product_dropdown.svg";
import product_unsorted from "../../assets/Products/product_unsorted.svg";
import ProductCard from "../../components/ProductCard";
import Banner from "./Banner";
import PriceContent from "./PriceContent";
import BrandsContent from "./BrandsContent";
import Pagination from "../../components/Pagination";
import FilterTagContainer from "./FilterTagContainer";

const Product = () => {
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const page = queryParams.get('page');
    const category = queryParams.get('category');
    const sortBy = queryParams.get('sortBy');
    const priceRange = queryParams.get('priceRange');
    const brands = queryParams.get('brands');
    const keyword = queryParams.get('keyword');
    const [isPriceRotated, setIsPriceRotated] = useState(false);
    const currentPage = parseInt(page, 10) || 1;
    const [isBrandsRotated, setIsBrandsRotated] = useState(false);
    const [sortedBy, setIsSortedBy] = useState("Most Popular");
    const [products, setProducts] = useState([]); 
    const [categoryDescription, setCategoryDescription] = useState("");
    const [maxPrice, setMaxPrice] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentFilter, setCurrentFilter] = useState([]);
    const [currentBrands, setCurrentBrands] = useState([]);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);  
    const [sliderValue, setSliderValue] = useState([10,10]);

    useEffect(() => {
        async function fetchData() {
            if(category === ""){
                window.location.href = "/404";
            }
            await getAllProductByCategoryOrKeyword({category,page,sortBy,priceRange,brands,keyword}).then((res) => {
                setCategoryDescription(res.data.data.description);
                setProducts(res.data.data.items);
                if(priceRange!==null){
                    let newPriceRange = priceRange.split('-');
                    setSliderValue([newPriceRange[0],newPriceRange[1]]);    
                }
                else{
                    setSliderValue([10,res.data.data.maxPrice]);
                }
                setTotalPages(Math.ceil(res.data.data.totalItem / 16));
                setCurrentBrands(res.data.data.brands);
                setMaxPrice(res.data.data.maxPrice);
                let itemsArray = [];
                if(brands !== null){
                    itemsArray = brands.split(',');
                    setSelectedBrands(itemsArray);
                }
                let filter =  [];
                if(priceRange !== null) {
                filter.push({
                    priceRange: priceRange,
                    });
                }
                if(itemsArray.length > 0) {
                    itemsArray.forEach(item => {
                        filter.push({
                            brands: item,
                        });
                    })
                }
                setCurrentFilter(filter);
            })
        }
        if(sortBy !== null) {
            setIsSortedBy(sortBy);
        }
        fetchData();
    },[]);
    const handleSorted = (category) => {
        setIsSortedBy(category);
    }
    const handleSliderChange = (newValues) => {
        setSliderValue(newValues);
    };
    const handlePriceRotate = () => {   
        setIsPriceRotated(!isPriceRotated)
    }
    const handleBrandsRotate = () => {   
        setIsBrandsRotated(!isBrandsRotated)
    }
    const handleSortByChange = (sortBy) => {
        const { search, pathname } = window.location;
        const queryParams = new URLSearchParams(search);
        queryParams.set('sortBy', sortBy);
        queryParams.set('page','1');
        const newSearch = queryParams.toString();
        window.location.href = `${pathname}?${newSearch}`;
    }
    const handleCheckBoxChange = (checkedValues) => {
        setSelectedBrands(checkedValues);
    }
    const submitBrandsSearch = (brands) => {
        const brandsString = brands.length > 1 ? brands.join(',') : brands[0];
        const { search,pathname } = window.location;
        const queryParams = new URLSearchParams(search);
        if(!brandsString){
            queryParams.delete('brands');
            console.log('a')
        }else{
            queryParams.set('brands', brandsString);
        }
        queryParams.set('page','1');    
        window.location.href = `${pathname}?${queryParams}`;
    }
    return (
        <Flex w="100%" flexDir="column" gap="40px">
            <Banner category={category} categoryDescription={categoryDescription}/>
            <FilterTagContainer currentFilter={currentFilter}/>
            <Box>
                <Flex fontFamily="Inter, sans-serif" alignItems="center" >
                    <Flex gap="30px" justifyContent="center" w="full" >
                        <Popover>
                            <PopoverTrigger>
                                <Flex gap="100px" _hover={{cursor: "pointer"}} justifySelf="center" as="button" alignItems="center" onClick={handlePriceRotate}>
                                    <Text fontSize="1.25rem" fontWeight="700" color="shieldtify.grey.100">Price</Text>
                                    <Image 
                                    src={product_dropdown} 
                                        alt="product-dropdown" 
                                        transform={isPriceRotated ? "rotate(180deg)" : null}
                                    />
                                </Flex>
                            </PopoverTrigger>
                            <PopoverContent minW="max-content">
                                <PriceContent 
                                values={sliderValue}  
                                maxPrice={maxPrice}
                                handleChange={handleSliderChange}
                                />
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger>
                                <Flex gap="100px" _hover={{cursor: "pointer"}} justifySelf="center" as="button" alignItems="center" onClick={handleBrandsRotate}>
                                    <Text fontSize="1.25rem" fontWeight="700" color="shieldtify.grey.100">Brands</Text>
                                    <Image 
                                    src={product_dropdown} 
                                    alt="product-dropdown" 
                                    transform={isBrandsRotated ? "rotate(180deg)" : null}
                                    />
                                </Flex>
                            </PopoverTrigger>
                            <PopoverContent minW="max-content">
                                <BrandsContent 
                                Brands={currentBrands} 
                                selectedBrands={selectedBrands}
                                handleCheckBoxChange={handleCheckBoxChange}
                                submitBrandsSearch={submitBrandsSearch}
                                />
                            </PopoverContent>
                        </Popover>
                    </Flex>
                    <Popover isOpen={isSortOpen} onClose={() => setIsSortOpen(false)}>
                        <PopoverTrigger>
                            <Button 
                            padding="10px 20px" 
                            right="30px" 
                            position="absolute" 
                            borderRadius="10px"
                            onClick={() => setIsSortOpen(true)}
                            > 
                                <Flex justifyContent="space-between">
                                    <Image src={product_unsorted} mr="12px"/>
                                    <Flex >
                                        <Text fontWeight="bold">Sorted by:&nbsp;</Text>
                                        <Text fontWeight="400">
                                            {`${sortedBy}`}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent padding="35px 33px" >
                            <PopoverArrow />
                            <Flex flexDir="column" gap="15px">
                                {SortCategories.map((category) => (
                                    <Box key={category.id}
                                    onClick={() => {
                                        handleSortByChange(category.name);
                                        handleSorted(category.name);
                                        setIsSortOpen(false);
                                    }}
                                    >
                                        <Text
                                            color="shieldtify.100"
                                            fontSize="1.25rem"
                                            fontWeight="500"
                                            _hover={{
                                                cursor: "pointer",
                                                textDecorationLine: "underline",
                                            }}
                                        >
                                            {category.name}
                                        </Text>
                                    </Box>
                                ))}
                            </Flex>
                        </PopoverContent>
                    </Popover>
                </Flex>
            </Box> 
            <Box paddingX="50px">
                <Grid gridTemplateColumns="repeat(4,1fr)" gap="50px" justifyContent="center">
                {
                    products.length > 0 && products.map((product) => {
                        return (
                            <ProductCard key={product.uid} product={product}/>
                        )
                    })
                }
                </Grid>
            </Box>
            <Flex justifyContent="center" mb="50px">
                <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/products?page=${page}&category=${category}&sortBy${sortBy}`}/>
            </Flex>
        </Flex>
    )
}

export default Product;