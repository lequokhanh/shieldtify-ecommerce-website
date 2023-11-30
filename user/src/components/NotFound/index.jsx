import notfound from '../../assets/notfound.svg'
import { Flex, Button, Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/image'
import * as router from 'react-router-dom'

const NotFound = () => {
    return (
        <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            gap="30px"
            mt="220px"
        >
            <Image src={notfound} alt="notfound" width={350} />
            <Text color="#2D2D2D" fontSize="20px" fontWeight="800">
                THE PAGE YOU WERE LOOKING FOR DOESN’T EXISTS.
            </Text>
            <Button
                colorScheme="blackAlpha"
                bgColor="#2D2D2D"
                color="#FFFFFF"
                type="submit"
                w="300px"
                borderRadius="20px"
                fontWeight="600"
                fontSize="0.875rem"
                as={router.Link}
                to="/home"
            >
                Go to home
            </Button>
        </Flex>
    )
}

export default NotFound
