import { 
    Flex, 
    Box, 
    Image, 
    Text } 
from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
const PasswordValidBox = ({image, snBoxcolor, ecBoxColor,bgColor}) => {
    return (
    <Flex alignItems="center" gap="15px" borderRadius="8px" background={bgColor} flexDir="row" fontFamily="Inter, sans-serif" padding="20px">
      <Box>
        <Image src={image}/>
      </Box>
      <Flex flexDir="column" gap="5px">
        <Text fontSize="15px" fontWeight="700" lineHeight="20px" color="#2D2D2D">Your password needs to:</Text>
				<Box>
					<Box color={snBoxcolor}>
						<Text fontSize="13px" fontWeight="400">
							<CheckCircleIcon/> Include at least one number or symbol
						</Text>
					</Box>
					<Box color={ecBoxColor}>
						<Text fontSize="13px" fontWeight="400"> 
							<CheckCircleIcon/> Be at least 8 characters long
						</Text>
					</Box>
				</Box>
      </Flex>
    </Flex>
    );
}

export default PasswordValidBox;