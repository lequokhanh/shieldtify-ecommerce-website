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
    Skeleton,
} from '@chakra-ui/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAllProductByCategoryOrKeyword } from '../../utils/api'
import { useEffect, useState } from 'react'
import { SortCategories } from '../../Categories'
import product_dropdown from '../../assets/Products/product_dropdown.svg'
import product_unsorted from '../../assets/Products/product_unsorted.svg'
import ProductCard from '../../components/ProductCard'
import Banner from './Banner'
import PriceContent from './PriceContent'
import BrandsContent from './BrandsContent'
import Pagination from '../../components/Pagination'
import FilterTagContainer from './FilterTagContainer'

const Product = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { page, category, sortBy, priceRange, brands, keyword } =
        Object.fromEntries(searchParams.entries())
    const [isPriceRotated, setIsPriceRotated] = useState(false)
    const currentPage = parseInt(page, 10) || 1
    const [isBrandsRotated, setIsBrandsRotated] = useState(false)
    const [sortedBy, setIsSortedBy] = useState('Most Popular')
    const [products, setProducts] = useState([])
    const [categoryDescription, setCategoryDescription] = useState('')
    const [maxPrice, setMaxPrice] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentFilter, setCurrentFilter] = useState([])
    const [currentBrands, setCurrentBrands] = useState([])
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [selectedBrands, setSelectedBrands] = useState([])
    const [sliderValue, setSliderValue] = useState([10, 11])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            if (category === '') {
                navigate('/404')
            }
            await getAllProductByCategoryOrKeyword({
                category,
                page,
                sortBy,
                priceRange,
                brands,
                keyword,
            }).then((res) => {
                setCategoryDescription(res.data.data.description)
                console.log(priceRange)
                setProducts(res.data.data.items)
                if (priceRange) {
                    let newPriceRange = priceRange.split('-')
                    setSliderValue([newPriceRange[0], newPriceRange[1]])
                } else {
                    setSliderValue([10, res.data.data.maxPrice])
                }
                setTotalPages(Math.ceil(res.data.data.totalItem / 16) || 1)
                setCurrentBrands(res.data.data.brands)
                setMaxPrice(res.data.data.maxPrice)
                let itemsArray = []
                if (brands) {
                    itemsArray = brands.split(',')
                    setSelectedBrands(itemsArray)
                } else {
                    setSelectedBrands([])
                }
                if (
                    currentPage > (Math.ceil(res.data.data.totalItem / 16) || 1)
                ) {
                    navigate(`/404`)
                }
                let filter = []
                if (priceRange) {
                    filter.push({
                        priceRange: priceRange,
                    })
                }
                if (itemsArray.length > 0) {
                    itemsArray.forEach((item) => {
                        filter.push({
                            brands: item,
                        })
                    })
                }
                setCurrentFilter(filter)
            })
            setIsLoading(false)
        }
        if (sortBy) {
            setIsSortedBy(sortBy)
        }
        fetchData()
    }, [
        page,
        category,
        sortBy,
        priceRange,
        brands,
        keyword,
        totalPages,
        currentPage,
    ])
    const handleSorted = (category) => {
        setIsSortedBy(category)
    }
    const handleSliderChange = (newValues) => {
        setSliderValue(newValues)
    }
    const handlePriceRotate = () => {
        setIsPriceRotated(!isPriceRotated)
    }
    const handleBrandsRotate = () => {
        setIsBrandsRotated(!isBrandsRotated)
    }
    const handleSortByChange = (sortBy) => {
        searchParams.set('sortBy', sortBy)
        searchParams.set('page', '1')
        setSearchParams(searchParams)
    }
    const handleCheckBoxChange = (checkedValues) => {
        setSelectedBrands(checkedValues)
    }
    const submitBrandsSearch = (brands) => {
        const brandsString = brands.length > 1 ? brands.join(',') : brands[0]
        if (!brandsString) {
            searchParams.delete('brands')
        } else {
            searchParams.set('brands', brandsString)
            searchParams.set('page', '1')
        }
        setSearchParams(searchParams)
    }
    return (
        <Flex w="100%" flexDir="column" gap="40px">
            <Banner
                category={category}
                categoryDescription={categoryDescription}
                keyword={keyword}
            />
            <FilterTagContainer
                currentFilter={currentFilter}
                searchParams={searchParams}
                setSearchParams={(searchParams) => {
                    setSearchParams(searchParams)
                }}
            />
            <Box>
                <Flex fontFamily="Inter, sans-serif" alignItems="center">
                    <Flex gap="30px" justifyContent="center" w="full">
                        <Popover onClose={handlePriceRotate}>
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
                                            onSubmit={() => {
                                                if (
                                                    sliderValue[0] === 10 &&
                                                    sliderValue[1] === maxPrice
                                                )
                                                    searchParams.delete(
                                                        'priceRange'
                                                    )
                                                else
                                                    searchParams.set(
                                                        'priceRange',
                                                        `${sliderValue[0]}-${sliderValue[1]}`
                                                    )
                                                searchParams.set('page', '1')
                                                setSearchParams(searchParams)
                                                onClose()
                                            }}
                                            values={sliderValue}
                                            handleChange={handleSliderChange}
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
                                                submitBrandsSearch={
                                                    submitBrandsSearch
                                                }
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
                                position="absolute"
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
                                            {`${sortedBy}`}
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
                                            handleSortByChange(category.name)
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
            </Box>
            {products.length > 0 ? (
                <Box paddingX="50px">
                    <Grid
                        gridTemplateColumns="repeat(4,1fr)"
                        gap="50px"
                        justifyContent="center"
                    >
                        {products.map((product) => (
                            <ProductCard key={product.uid} product={product} />
                        ))}
                    </Grid>
                </Box>
            ) : !isLoading ? (
                <Text
                    textAlign={'center'}
                    fontSize={'1.5rem'}
                    fontWeight={'700'}
                >
                    No products found
                </Text>
            ) : (
                <Skeleton height="400px" />
            )}
            <Flex justifyContent="center" mb="50px">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={(page) => {
                        searchParams.set('page', page)
                        setSearchParams(searchParams)
                    }}
                />
            </Flex>
        </Flex>
    )
}

export default Product
