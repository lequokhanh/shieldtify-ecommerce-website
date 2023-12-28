import { Image, Flex, Grid, Text, SlideFade } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import no_img from '../../assets/no_img.svg'
import { useNavigate } from 'react-router-dom'
import * as router from 'react-router-dom'

const SecondModal = ({
    selectedProducts,
    currentCategoryRedir,
    onClose,
    isOpen,
}) => {
    const firstNineProducts = selectedProducts.slice(0, 7)
    const navigate = useNavigate()
    return isOpen ? (
        <SlideFade
            in={isOpen}
            offsetY={'0px'}
            offsetX={'-10px'}
            transition={
                ({ enter: { duration: 0.3 } }, { exit: { duration: 0.3 } })
            }
        >
            <Flex
                minW="450px"
                minH="800px"
                borderRadius="0 10px 10px 0"
                borderLeft="1px solid black"
                bgColor="white"
                fontFamily="Inter, sans-serif"
                flexDir="column"
                // padding="72px 40px"
                justifyContent="center"
                position="relative"
                right="-10px"
            >
                <Grid gridTemplateColumns="repeat(1,1fr)" paddingX="40px">
                    {firstNineProducts.map((item) => (
                        <SlideFade
                            key={item.uid}
                            in={isOpen}
                            offsetY={'-10px'}
                            transition={{
                                enter: {
                                    duration: 0.5,
                                    delay:
                                        0.05 * firstNineProducts.indexOf(item),
                                },
                            }}
                        >
                            <Flex
                                key={item.uid}
                                gap="20px"
                                alignItems="center"
                                padding="10px 20px"
                                justifyContent="flex-start"
                                paddingY="10px"
                                whiteSpace="nowrap"
                                overflowX="hidden"
                                _hover={{
                                    background: 'shieldtify.grey.300',
                                    cursor: 'pointer',
                                    borderRadius: '15px',
                                }}
                                onClick={() => {
                                    // navigate(`/product/${item.uid}`)
                                    onClose()
                                }}
                                as={router.Link}
                                to={`/product/${item.uid}`}
                                w={'450px'}
                            >
                                <Image
                                    w="60px"
                                    h="70px"
                                    objectFit="contain"
                                    src={
                                        item.primary_img
                                            ? item.primary_img
                                            : no_img
                                    }
                                />
                                <Text
                                    fontSize="1.25rem"
                                    fontWeight="400"
                                    color="shieldtify.100"
                                    isTruncated
                                >
                                    {item.name}
                                </Text>
                            </Flex>
                        </SlideFade>
                    ))}
                </Grid>
                <Flex
                    justifyContent="flex-end"
                    alignItems="center"
                    gap="7px"
                    paddingX="20px"
                    position="absolute"
                    bottom="4"
                    right="1"
                >
                    <Text
                        fontSize="1.25rem"
                        fontWeight="400"
                        color="shieldtify.100"
                        _hover={{
                            cursor: 'pointer',
                            textDecorationLine: 'underline',
                        }}
                        onClick={() => {
                            onClose()
                            navigate(
                                `/products?category=${currentCategoryRedir}`
                            )
                        }}
                    >
                        Explore more
                    </Text>
                    <ArrowForwardIcon />
                </Flex>
            </Flex>
        </SlideFade>
    ) : (
        <Flex w="20px" minH="800px" bgColor="white" borderRadius={'10px'} />
    )
}

export default SecondModal
