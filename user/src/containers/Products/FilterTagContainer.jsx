import { Flex, Button } from "@chakra-ui/react";
import FilterTag from "../../components/FilterTag";
import removeAllParams from "../../utils/removeAllParams";

const FilterTagContainer = ({ currentFilter }) => {
    return (
        <Flex 
        gap="10px"
        fontFamily="Inter, sans-serif" 
        paddingX="50px"
        alignItems="center"
        wrap="wrap"
        >
            {currentFilter.length > 0 && (
                <Button colorScheme="red" onClick={removeAllParams}>
                    Remove Filter
                </Button>
            )}
            {currentFilter.map((filter) => {
                if (filter.priceRange) {
                    return (
                        <FilterTag
                            key={filter.priceRange}
                            name={filter.priceRange}
                            filterBy="priceRange"
                        />
                    );
                }
                if (filter.brands) {
                    return (
                        <FilterTag
                            key={filter.brands}
                            name={filter.brands}
                            filterBy="brands"
                        />
                    );
                }
                // if (filter.sortBy) {
                //     return (
                //         <FilterTag
                //             key={filter.sortBy}
                //             name={filter.sortBy}
                //             filterBy="sortBy"
                //         />
                //     );
                // }
            })}
        </Flex>
    );
};

export default FilterTagContainer;