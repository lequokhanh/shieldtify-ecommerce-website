import { 
    Box,
    Button,
    Flex,
    Grid,
    Image,
    Modal, 
    ModalCloseButton, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    Skeleton,
    SkeletonText,
    Text,
    useToast
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProductByCategoryOrKeywordBuilder } from "../../utils/api";
import product_dropdown from '../../assets/Products/product_dropdown.svg'
import product_unsorted from '../../assets/Products/product_unsorted.svg'
import PriceContent from "../Products/PriceContent";
import BrandsContent from "../Products/BrandsContent";
import { SortCategories } from "../../Categories";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import SearchInput from "../../components/SearchInput";
import StatelessFilterTagsContainer from "./StatelessFilterTagsContainer";

const BuilderModal = ({
    isOpen,
    ModalOnClose,
    category, 
    setIsModalOpen, 
    setComponentTotal, 
    componentTotal,
    components, 
    setComponents, 
    currentCategoryIndex,
    visibleRamCount,
    visibleStorageCount,
    setVisibleRamCount,
    setVisibleStorageCount,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [isBrandsRotated, setIsBrandsRotated] = useState(false);
    const [isPriceRotated, setIsPriceRotated] = useState(false);
    const [isSortedBy, setIsSortedBy] = useState('Most Popular');
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [currentFilter, setCurrentFilter] = useState([]);
    const [currentBrands, setCurrentBrands] = useState([]);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [sliderValue, setSliderValue] = useState(null);
    const [submittedSliderValue, setSubmittedSliderValue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            if (category === '') {
                navigate('/404')
            }
            await getAllProductByCategoryOrKeywordBuilder({
                category: category,
                page: currentPage,
                sortBy: isSortedBy,
                priceRange: submittedSliderValue,
                brands: selectedBrands,
                keyword: searchValue,
            }).then((res) => {
                setProducts(res.data.data.items);
                setTotalPages(Math.ceil(res.data.data.totalItem / 16) || 1)
                setCurrentBrands(res.data.data.brands)
                setMaxPrice(res.data.data.maxPrice)
                if (
                    currentPage > (Math.ceil(res.data.data.totalItem / 16) || 1)
                ) {
                    navigate(`/404`)
                }
                let filter = []
                if (submittedSliderValue) {
                    filter.push({
                        priceRange: `${submittedSliderValue[0]} - $${submittedSliderValue[1]}`,
                    })
                }
                if (selectedBrands.length > 0) {
                    selectedBrands.forEach((item) => {
                        filter.push({
                            brands: item,
                        })
                    })
                }
                setCurrentFilter(filter)
            }).catch(() =>{
                setIsLoading(false);
            })
            setIsLoading(false)
        }
        if(category !== '') {
            fetchData()
        }
    }, [
        category,
        selectedBrands,
        submittedSliderValue,
        searchValue,
        isSortedBy,
        currentPage,
        navigate,
    ]);
    useEffect(() => {
        setCurrentPage(1);
    },[selectedBrands,searchValue,isSortedBy])
    const handleSliderChange = (newValues) => {
        setSliderValue(newValues)
    };
    const handlePriceRotate = () => {
        setIsPriceRotated(!isPriceRotated)
    };
    const handleBrandsRotate = () => {
        setIsBrandsRotated(!isBrandsRotated)
    };
    const handleCheckBoxChange = (checkedValues) => {
        setSelectedBrands(checkedValues)
    }
    const handleSorted = (category) => {
        setIsSortedBy(category);
    }
    const handleSelect = (product) => {
        setIsModalOpen(false);
        let NewComponents = [...components]; // create a copy of the components array
        console.log(currentCategoryIndex, components[currentCategoryIndex].description);
        if (components[currentCategoryIndex].description === "+ Add another Ram" || components[currentCategoryIndex].description === "+ Add another Storage") {
            NewComponents.splice(currentCategoryIndex, 0, { ...product, quantity: 1, category: components[currentCategoryIndex].category });
        } else {
            NewComponents[currentCategoryIndex] = { ...components[currentCategoryIndex], ...product, quantity: 1 };
        }
        setComponents(NewComponents);  
        setComponentTotal(parseFloat((componentTotal+product.price).toFixed(2)))
        toast({
            title: "Added to builder.",
            description: `A new product has been added to your builder.`,
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    };
    return(
    <Modal
    isOpen={isOpen}
    onClose={() => {
        ModalOnClose();
        setSliderValue(null);
        setProducts([]);
        setCurrentPage(1);
        setSearchValue('');
        setSelectedBrands([]);
        setSubmittedSliderValue(null);
        setIsSortedBy("Most Popular");
    }}
    blockScrollOnMount={'false'} 
    size="6xl"
    >
        <ModalOverlay/>
        <ModalContent
        borderRadius={'10px'}
        minH="420px"
        minW="1800px"
        fontFamily="Inter"
        >
            <ModalHeader    
            bgColor={'#2D2D2D'}
            color={'white'}
            borderTopRadius={'10px'}>
                Select {category}
            </ModalHeader>
            <ModalCloseButton
            bgColor={'white'}
            borderRadius={'50%'}
            size={'sm'}
            mt={'10px'}
            mr={'10px'}
            />
            <Flex w="100%" flexDir="column" gap="40px" padding="35px">
                <Flex fontFamily="Inter, sans-serif" alignItems="center" justifyContent="space-between" w="full">
                        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} setCurrentPage={setCurrentPage}/>
                        <Flex gap="30px" >
                            <Popover onClose={() => {
                                handlePriceRotate();
                            }}>
                                {({ onClose }) => (
                                    <>
                                        <PopoverTrigger>
                                            <Flex
                                                gap="100px"
                                                _hover={{ cursor: 'pointer' }}
                                                justifySelf="center"
                                                as="button"
                                                alignItems="center"
                                                onClick={handlePriceRotate}
                                            >
                                                <Text
                                                    fontSize="1.25rem"
                                                    fontWeight="700"
                                                    color="shieldtify.grey.100"
                                                >
                                                    Price
                                                </Text>
                                                <Image
                                                    src={product_dropdown}
                                                    alt="product-dropdown"
                                                    transform={
                                                        isPriceRotated
                                                            ? 'rotate(180deg)'
                                                            : null
                                                    }
                                                />
                                            </Flex>
                                        </PopoverTrigger>
                                        <PopoverContent minW="max-content">
                                            <PriceContent
                                                maxPrice={maxPrice}
                                                handleChange={handleSliderChange}
                                                onSubmit={() => {
                                                    if (!sliderValue || (sliderValue && sliderValue[0] === 10 && sliderValue[1] === maxPrice)) {
                                                        setSliderValue(null);
                                                        setSubmittedSliderValue(null);
                                                        setCurrentFilter(currentFilter.filter(filter => filter.price !== "priceRange"));
                                                    }else{
                                                        setSubmittedSliderValue(sliderValue);
                                                    }
                                                    onClose()
                                                }}
                                                values={sliderValue}
                                                onClose={onClose}
                                            />
                                        </PopoverContent>
                                    </>
                                )}
                            </Popover>
                            <Popover onClose={handleBrandsRotate}>
                                {({ onClose }) => {
                                    return (
                                        <>
                                            <PopoverTrigger>
                                                <Flex
                                                    gap="100px"
                                                    _hover={{ cursor: 'pointer' }}
                                                    justifySelf="center"
                                                    as="button"
                                                    alignItems="center"
                                                    onClick={handleBrandsRotate}
                                                >
                                                    <Text
                                                        fontSize="1.25rem"
                                                        fontWeight="700"
                                                        color="shieldtify.grey.100"
                                                    >
                                                        Brands
                                                    </Text>
                                                    <Image
                                                        src={product_dropdown}
                                                        alt="product-dropdown"
                                                        transform={
                                                            isBrandsRotated
                                                                ? 'rotate(180deg)'
                                                                : null
                                                        }
                                                    />
                                                </Flex>
                                            </PopoverTrigger>
                                            <PopoverContent minW="max-content">
                                                <BrandsContent
                                                    Brands={currentBrands}
                                                    selectedBrands={selectedBrands}
                                                    handleCheckBoxChange={
                                                        handleCheckBoxChange
                                                    }
                                                    type="builder"
                                                    onClose={onClose}
                                                />
                                            </PopoverContent>
                                        </>
                                    )
                                }}
                            </Popover>
                        </Flex>
                        <Popover
                            isOpen={isSortOpen}
                            onClose={() => setIsSortOpen(false)}
                        >
                            <PopoverTrigger>
                                <Button
                                    padding="10px 20px"
                                    right="30px"
                                    borderRadius="10px"
                                    onClick={() => setIsSortOpen(true)}
                                >
                                    <Flex justifyContent="space-between">
                                        <Image src={product_unsorted} mr="12px" />
                                        <Flex>
                                            <Text fontWeight="bold">
                                                Sorted by:&nbsp;
                                            </Text>
                                            <Text fontWeight="400">
                                                {`${isSortedBy}`}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent padding="35px 33px">
                                <PopoverArrow />
                                <Flex flexDir="column" gap="15px">
                                    {SortCategories.map((category) => (
                                        <Box
                                            key={category.id}
                                            onClick={() => {
                                                handleSorted(category.name)
                                                setIsSortOpen(false)
                                            }}
                                        >
                                            <Text
                                                color="shieldtify.100"
                                                fontSize="1.25rem"
                                                fontWeight="500"
                                                _hover={{
                                                    cursor: 'pointer',
                                                    textDecorationLine: 'underline',
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
                    <StatelessFilterTagsContainer
                    currentFilter={currentFilter}
                    setCurrentFilter={setCurrentFilter}
                    setSelectedBrands={setSelectedBrands}
                    setSubmittedSliderValue={setSubmittedSliderValue}
                    setSliderValue={setSliderValue}
                    />
                    {products.length > 0 ? (
                        <Box paddingX="50px">
                            <Grid
                            gridTemplateColumns="repeat(4,1fr)"
                            gap="50px"
                            justifyContent="center"
                            >
                            {products.map((product,index) => (
                                <ProductCard key={index} product={product} type="builder" handleSelect={handleSelect}/>
                            ))}
                            </Grid>
                        </Box>
                        ) 
                        : !isLoading ? (
                            <Text
                                textAlign={'center'}
                                fontSize={'1.5rem'}
                                fontWeight={'700'}
                            >
                                No products found
                            </Text>
                        ) : (
                            <Box paddingX="50px">
                                <Grid
                                    gridTemplateColumns="repeat(4,1fr)"
                                    gap="50px"
                                    justifyContent="center"
                                >
                                    {[...Array(16)].map((_, index) => (
                                        <Flex
                                            key={index}
                                            flexDir="column"
                                            gap="20px"
                                            justifyContent="space-between"
                                        >
                                            <Skeleton
                                                height="400px"
                                                width="400px"
                                                borderRadius="15px"
                                            />
                                            <SkeletonText height="10px" width="400px" />
                                        </Flex>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                    <Flex justifyContent="center" mb="50px">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onChange={(page) => {
                                setCurrentPage(page);
                            }}
                        />
                    </Flex>                
                </Flex>
            </ModalContent>
        </Modal>
        )
    }

    export default BuilderModal;