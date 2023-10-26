import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'
import * as router from "react-router-dom";
import logo from "../../assets/shieldtify-logo.svg";
import builder from "../../assets/builder.svg"
import cpu from "../../assets/cpu.svg"
import book from "../../assets/book.svg"
import message from "../../assets/message.svg"
import group from "../../assets/Group.svg"
import cart from "../../assets/Cart.svg"
import search_line from "../../assets/clarity_search-line.svg"


const NavBar = () => {
    return (
          <Flex alignItems="center" 
          h="80px" 
          w="full"  
          justifyContent="space-around" 
          borderBottom="0.5px solid #444444" 
          fontFamily="Inter, sans-serif" 
          position="fixed"
          top="0" 
          left="0"
          zIndex={99}
          bgColor='white'
          >
            <Box as={router.Link} to="/" _hover={{cursor: "pointer"}}>
              <Image src={logo} alt="Logo" objectFit="fi"/>
            </Box>
            <Flex gap="1.875em"> 
              <Button paddingX="5px" gap="8px" variant="none" as={router.Link} to="#" _hover={{cursor: "pointer"}}>
                <Image  src={builder} alt="builder"/>
                <Text>Builder</Text>
              </Button>
              <Button gap="8px" paddingX="5px" variant="none" as={router.Link} to="#" _hover={{cursor: "pointer"}}>
                <Image src={cpu} alt="Products"/>
                <Text>Products</Text>
                <ChevronDownIcon/>
              </Button>
              <Button gap="8px" paddingX="5px" variant="none" as={router.Link} to="#" _hover={{cursor: "pointer"}}>
                <Image src={book} alt="Guide"/>
                <Text>Guide</Text>
              </Button>
              <Button gap="8px" paddingX="5px" variant="none" as={router.Link} to="#" _hover={{cursor: "pointer"}}>
                <Image src={message} alt="Forum"/>
                <Text>Forum</Text>
              </Button>
            </Flex>
            <Flex alignItems="center" gap="40px" >
              <Box w="20px" h="30px" as={router.Link} _hover={{cursor: "pointer"}} >
                <Image  src={group} alt="Group"/>
              </Box>
              <Box w="20px" h="30px" _hover={{cursor: "pointer"}}>
                <Image  src={cart} alt="Cart"/>
              </Box>
              <Box w="20px" h="30px" _hover={{cursor: "pointer"}}>
                <Image  src={search_line} alt="Search"/>
              </Box>
            </Flex>
          </Flex>
    );
}

export default NavBar;