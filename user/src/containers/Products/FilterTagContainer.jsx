import { Flex, Button } from '@chakra-ui/react'
import FilterTag from '../../components/FilterTag'

const FilterTagContainer = ({
    currentFilter,
    searchParams,
    setSearchParams,
}) => {
    return (
        <Flex
            gap="10px"
            fontFamily="Inter, sans-serif"
            paddingX="50px"
            alignItems="center"
            wrap="wrap"
        >
            {currentFilter.length > 0 && (
                <Button
                    colorScheme="red"
                    onClick={() => {
                        searchParams.delete('priceRange')
                        searchParams.delete('brands')
                        setSearchParams(searchParams)
                    }}
                >
                    Remove Filter
                </Button>
            )}
            {currentFilter.map((filter) => {
                if (filter.priceRange) {
                    return (
                        <FilterTag
                            key={filter.priceRange}
                            name={filter.priceRange}
                            onClick={() => {
                                searchParams.delete('priceRange')
                                setSearchParams(searchParams)
                            }}
                            filterBy="priceRange"
                        />
                    )
                }
                if (filter.brands) {
                    return (
                        <FilterTag
                            key={filter.brands}
                            name={filter.brands}
                            onClick={() => {
                                let brands = searchParams
                                    .get('brands')
                                    .split(',')
                                    .filter((brand) => brand != filter.brands)
                                if (brands.length !== 0)
                                    searchParams.set('brands', brands)
                                else searchParams.delete('brands')
                                setSearchParams(searchParams)
                            }}
                            filterBy="brands"
                        />
                    )
                }
            })}
        </Flex>
    )
}

export default FilterTagContainer
