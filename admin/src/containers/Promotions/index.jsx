import { Button, Flex, HStack, Heading, Popover, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";
import SearchInput from "../../components/SearchInput";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { AddIcon } from "@chakra-ui/icons";
import CreateNewPopoverContent from "../Products/CreateNewPopoverContent";

const Promotions = () => {
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { currentUser } = useContext(AuthContext);
    return(
        <Flex flexDir="column" padding="24px 34px" w="full" gap="30px">
			<Flex justifyContent="space-between" fontFamily="Inter">
                <Heading
                fontSize="2rem"
                fontWeight="700"
                color="shieldtify.checkout"
				>
					Manage Promotions
				</Heading>
                <HStack gap="18px">
                    <SearchInput
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setCurrentPage={setCurrentPage}
                    />
					{
						(currentUser && currentUser.role !== "staff" && (
							<>
								<Popover placement="bottom-start">
									<PopoverTrigger>
										<Button
											color="#FFFFFF"
											colorScheme="blackAlpha"
											bgColor="#444444"
											border="1px solid #BDC1CA"
											boxShadow="0px 2px 5px 0px rgba(23, 26, 31, 0.09), 0px 0px 2px 0px rgba(23, 26, 31, 0.12)"
											borderRadius="12px"
											padding="7px 15px 7px 12px"
										>
											<HStack>
												<AddIcon />
												<Text fontSize="14px" fontWeight="400">
													New
												</Text>
											</HStack>
										</Button>
									</PopoverTrigger>
									<PopoverContent>
									</PopoverContent>
								</Popover>
							</>
						))
					}                    
                </HStack>
            </Flex>
        </Flex>
    )
}

export default Promotions;