import { Flex, Text } from "@chakra-ui/react"
import { CloseIcon} from '@chakra-ui/icons';
import removeNameFromURL from "../../utils/removeNameFromURL";

const FilterTag = ({ name, filterBy}) => {
    return (
        <Flex gap='30px' p="10px 8px" bgColor="shieldtify.grey.300" borderRadius="10px" alignItems="center">
            {filterBy === 'priceRange' ? (
                <Text fontWeight="400">${name}</Text>
            ) : (
                <Text fontWeight="400">{name}</Text>
            )}
            <CloseIcon 
            onClick={() => removeNameFromURL(name, filterBy)} 
            _hover={{ cursor: 'pointer' }}
            />
        </Flex>
    );
};

export default FilterTag;