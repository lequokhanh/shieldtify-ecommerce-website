import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'
import * as router from "react-router-dom";


const NavBar = () => {
    return (
          <Flex alignItems="center" h="80px" w="Full" gap="12.5em" justifyContent="center" borderBottom="0.5px solid #444">
            <Box w="110px" h="49px">
              <Image src="shieldtify-logo.svg" alt="Logo" objectFit="fit"/>
            </Box>
            <Flex gap="1.875em"> 
              <Button paddingX="5px" gap="8px" variant="none" as={router.Link} to="#" _hover={{cursor: "pointer"}}>
                <Image  src="builder.svg" alt="builder"/>
                <Text>Builder</Text>
              </Button>
              <Button gap="8px" paddingX="5px" variant="none" as={router.Link} to="#" _hover={{cursor: "pointer"}}>
                <Image src="cpu.svg" alt="Products"/>
                <Text>Products</Text>
                <ChevronDownIcon/>
              </Button>
              <Button gap="8px" paddingX="5px" variant="none" as={router.Link} to="#" _hover={{cursor: "pointer"}}>
                <Image src="book.svg" alt="Guide"/>
                <Text>Guide</Text>
              </Button>
              <Button gap="8px" paddingX="5px" variant="none" as={router.Link} to="#" _hover={{cursor: "pointer"}}>
                <Image src="message.svg" alt="Forum"/>
                <Text>Forum</Text>
              </Button>
            </Flex>
            <Flex alignItems="center" gap="40px" >
              <Box w="20px" h="30px" as={router.link} _hover={{cursor: "pointer"}} >
                <Image  src="Group.svg" alt="Group"/>
              </Box>
              <Box w="20px" h="30px" _hover={{cursor: "pointer"}}>
                <Image  src="Cart.svg" alt="Cart"/>
              </Box>
              <Box w="20px" h="30px" _hover={{cursor: "pointer"}}>
                <Image  src="clarity_search-line.svg" alt="Search"/>
              </Box>
            </Flex>
          </Flex>
    );
}

export default NavBar;