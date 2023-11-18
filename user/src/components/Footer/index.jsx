import { Box, Flex, Image, Text } from "@chakra-ui/react"
import shieldtify_logo from "../../assets/shieldtify-logo.svg"
import email from "../../assets/Footer/email.svg"
import position from "../../assets/Footer/position.svg"

const Footer = () => (
    <Flex
    background="shieldtify.100"
    padding="110px 145px"
    justifyContent="center"
    w="100vw"
    >
        <Flex gap="97px">
            <Flex gap="20px" flexDir="column">
                <Image src={shieldtify_logo} transform="rotate(10deg)" /> 
                <Text fontSize="0.75rem" fontWeight="300" color="#FFF" whiteSpace="nowrap">
                © 2023 From UIT with Love
                </Text>
            </Flex>
            <Flex gap="15px" flexDir="column">
                <Text fontSize="1.125rem" fontWeight="700" color="shieldtify.300">Contact us</Text>
                <Flex gap="15px">
                    <Image src={position}/>
                    <Text fontWeight="400" color="shieldtify.300" whiteSpace="nowrap">UIT, Thu Duc, Viet Nam</Text>
                </Flex>
                <Flex gap="15px">
                    <Image src={email}/>
                    <Text fontWeight="400" color="shieldtify.300">Shieldtify@gmail.com</Text>
                </Flex>
            </Flex>
            <Flex gap="16px" flexDir="column" textAlign="right">
                <Text fontSize="1.375rem" fontWeight="700" color="#FFF">
                Professional Hi-End PC and Gaming Gear Provider
                </Text>
                <Text fontSize="1.125rem" fontWeight="400" color="#FFF">
                Delivering top-tier technology solutions and the best equipment for your gaming and computing needs. Elevate your experience with Shieldtify.
                </Text>
            </Flex>
        </Flex>
    </Flex>
)

export default Footer;