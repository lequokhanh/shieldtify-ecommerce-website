import { SortCategories } from "../../Categories";
import { Box, Text } from "@chakra-ui/react";

const SortContent = () => {
    return (
        <>
            {
                SortCategories.map((category) => (
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
        </>
    )
}

