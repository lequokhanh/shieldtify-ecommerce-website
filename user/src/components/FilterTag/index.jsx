import { Flex, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

const FilterTag = ({ name, filterBy, onClick }) => {
    return (
        <Flex
            gap="30px"
            p="10px 8px"
            bgColor="shieldtify.grey.300"
            borderRadius="10px"
            alignItems="center"
        >
            {filterBy === 'priceRange' ? (
                <Text fontWeight="400">${name}</Text>
            ) : (
                <Text fontWeight="400">{name}</Text>
            )}
            <CloseIcon onClick={onClick} _hover={{ cursor: 'pointer' }} />
        </Flex>
    )
}

export default FilterTag
