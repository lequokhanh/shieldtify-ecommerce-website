import { Flex, Button } from '@chakra-ui/react'
import FilterTag from '../../components/FilterTag'

const StatelessFilterTagsContainer = ({
    currentFilter,
    setCurrentFilter,
    setSelectedBrands,
    setSubmittedSliderValue,
    setSliderValue
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
                        setCurrentFilter([]);
                        setSelectedBrands([]);
                        setSubmittedSliderValue(null);
                        setSliderValue(null);
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
                                setCurrentFilter(currentFilter.filter(fil => !(fil.priceRange)));
                                setSubmittedSliderValue(null);
                                setSliderValue(null);
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
                                let newBrands = currentFilter.filter(fil => fil.brands !== filter.brands);
                                setCurrentFilter(newBrands);
                                setSelectedBrands(newBrands.map(fil => fil.brands));
                            }}
                            filterBy="brands"
                        />
                    )
                }
            })}
        </Flex>
    )
}

export default StatelessFilterTagsContainer
