import { Flex, Image } from "@chakra-ui/react";
import coming_soon from '../../assets/coming_soon.svg';

const ComingSoon = () => {
    return(
        <Flex h="100vh" alignItems="center">
            <Image src={coming_soon} alt="coming soon" />
        </Flex>
    )
}

export default ComingSoon;