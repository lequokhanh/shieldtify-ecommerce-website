/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import {
    Box,
    Divider,
    Button,
    Flex,
    Grid,
    Image,
    ListItem,
    Text,
    UnorderedList,
    useDisclosure,
    SimpleGrid,
    SkeletonCircle,
    SkeletonText,
} from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getProduct } from '../../utils/api.js'
import SpecificationModal from '../../components/SpecificationModal'
import { CartContext } from '../../context/cart.context'
import './style.css'
import no_img from '../../assets/no_img.svg'
import Dante from 'dante3/package/esm'

const PreviewSpecs = (product) => {
    const { addItemToCart } = useContext(CartContext)
    const jsonProductSpecs = JSON.parse(product.specification)
    let cnt = 0
    const specsArray = []
    for (const [key, value] of Object.entries(jsonProductSpecs)) {
        for (const [key2, value2] of Object.entries(value)) {
            if (cnt === 6) break

            if (value2 !== null && value2 !== undefined && value2 !== '') {
                try {
                    specsArray.push(
                        JSON.parse(
                            '{"' +
                                key2.charAt(0).toUpperCase() +
                                key2.slice(1).replace('_', ' ') +
                                '":"' +
                                value2 +
                                '"}'
                        )
                    )
                } catch (error) {
                    console.log(error)
                }
                cnt++
            }
        }
    }

    return specsArray
}

const ProductDetails = () => {
    const [product, setProduct] = useState(null)
    const [selectedImgIndex, setSelectedImgIndex] = useState(0)
    const [transition, setTransition] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { id } = useParams()
    const { addItemToCart } = useContext(CartContext)

    const transit = (direction) => {
        setTransition('transition-' + direction)
        setTimeout(() => {
            setTransition('')
        }, 500)
    }

    // fetch product data from api
    useEffect(() => {
        setProduct(null)
        async function fetchData() {
            await getProduct(id)
                .then((res) => {
                    setProduct(res.data.data)
                })
                .catch((err) => {
                    if (err.response.data.message === 'Invalid product id') {
                        window.location.href = '/404'
                    }
                })
        }
        fetchData()
    }, [id])

    return (
        <>
            {product ? (
                <Flex
                    paddingX={'70px'}
                    width={'full'}
                    mt={'100px'}
                    mb={'50px'}
                    flexDir={'column'}
                    fontFamily={'Inter, sans-serif'}
                    gap={'60px'}
                    alignContent={'center'}
                >
                    <Flex gap={'80px'} justifyContent={'center'}>
                        <Flex
                            flexDir={'column'}
                            fontFamily={'Inter, sans-serif'}
                            gap={'20px'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            minW={'500px'}
                        >
                            <Image
                                boxSize="500px"
                                objectFit="contain"
                                className={transition}
                                src={
                                    product.imgs.length >= 1
                                        ? product.imgs[selectedImgIndex].link
                                        : no_img
                                }
                            />
                            <Grid templateColumns="repeat(5, 1fr)" gap={'25px'}>
                                {product.imgs.length >= 1 &&
                                    product.imgs.map((_item, index) => (
                                        <Box
                                            display={'flex'}
                                            key={index}
                                            w={'100px'}
                                            h={'100px'}
                                            border={`2px solid ${
                                                index === selectedImgIndex
                                                    ? '#3C619E'
                                                    : '#919EAB'
                                            }`}
                                            borderRadius={'10px'}
                                            bgSize={'contain'}
                                            justifyContent={'center'}
                                            onClick={() => {
                                                if (index > selectedImgIndex)
                                                    transit('right')
                                                else if (
                                                    index < selectedImgIndex
                                                )
                                                    transit('left')

                                                setSelectedImgIndex(index)
                                            }}
                                        >
                                            <Image
                                                objectFit="contain"
                                                src={product.imgs[index].link}
                                                p={'12px'}
                                            />
                                        </Box>
                                    ))}
                            </Grid>
                        </Flex>
                        <Box>
                            <Divider
                                borderWidth={'1px'}
                                orientation={'vertical'}
                                borderColor={'#919EAB'}
                                height={'100%'}
                            />
                        </Box>
                        <Flex
                            flexDir={'column'}
                            mt={'50px'}
                            gap={'10px'}
                            width={'800px'}
                        >
                            <Box
                                py={'10px'}
                                px={'20px'}
                                bg={'#E8E8E8'}
                                borderRadius={'10px'}
                                h={'max-content'}
                                w={'max-content'}
                                fontWeight={'400'}
                                color={'shieldtify.100'}
                            >
                                {product.brand.name}
                            </Box>
                            <Box
                                fontSize={'2.5rem'}
                                fontWeight={'600'}
                                color={'#2D2D2D'}
                            >
                                {product.name}
                            </Box>
                            <Box
                                fontSize={'1.75rem'}
                                fontWeight={'400'}
                                color={'#FF6262'}
                            >
                                {product.price} $
                            </Box>
                            <Flex flexDir="column">
                                <Box mt={'40px'}>
                                    <Text
                                        as="u"
                                        fontSize="1.5rem"
                                        fontWeight={'700'}
                                        color={'#2D2D2D'}
                                    >
                                        Specification
                                    </Text>
                                    <Flex
                                        flexDir={'column'}
                                        ml={'40px'}
                                        mt={'5px'}
                                    >
                                        <UnorderedList>
                                            {PreviewSpecs(product).map(
                                                (item, index) => {
                                                    return (
                                                        <ListItem key={index}>
                                                            <Text
                                                                fontSize={
                                                                    '1.25rem'
                                                                }
                                                                fontWeight={
                                                                    '600'
                                                                }
                                                                color={
                                                                    '#2D2D2D'
                                                                }
                                                            >
                                                                {Object.keys(
                                                                    item
                                                                )}
                                                                :{' '}
                                                                <span className="text-zinc-800 text-xl font-normal font-['Inter']'">
                                                                    {Object.values(
                                                                        item
                                                                    )}
                                                                </span>
                                                            </Text>
                                                        </ListItem>
                                                    )
                                                }
                                            )}
                                        </UnorderedList>
                                    </Flex>
                                </Box>
                                <SimpleGrid
                                    flexDir={'row'}
                                    gap={'20px'}
                                    mt={'50px'}
                                    columns={2}
                                >
                                    <Button
                                        colorScheme="blackAlpha"
                                        bgColor="#2D2D2D"
                                        color="#FFFFFF"
                                        type="submit"
                                        borderRadius="25px"
                                        fontWeight={'500'}
                                        fontSize="1.25rem"
                                        fontFamily={'Roboto, sans-serif'}
                                        height={'50px'}
                                        onClick={onOpen}
                                    >
                                        See detailed specifications
                                    </Button>
                                    <SpecificationModal
                                        specification={product.specification}
                                        isOpen={isOpen}
                                        onClose={onClose}
                                    />

                                    <Button
                                        colorScheme="blackAlpha"
                                        bgColor="#3C619E"
                                        color="#FFFFFF"
                                        type="submit"
                                        borderRadius="25px"
                                        fontWeight={'500'}
                                        fontSize="1.25rem"
                                        fontFamily={'Roboto, sans-serif'}
                                        height={'50px'}
                                        gap={'5px'}
                                        onClick={() => {
                                            addItemToCart({ item: product, addType: "single" })
                                        }}
                                    >
                                        <span>+</span>Add to cart
                                    </Button>
                                </SimpleGrid>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex flexDir={'column'}>
                        <Box
                            color={'#2D2D2D'}
                            fontSize={'2rem'}
                            fontWeight={'700'}
                            mt={'10px'}
                        >
                            Description
                        </Box>
                        <Box
                            bgColor={'#EAEAEA'}
                            p={'50px'}
                            borderRadius={'10px'}
                        >
                            <Dante
                                readOnly={true}
                                content={product.description}
                            />
                        </Box>
                    </Flex>
                </Flex>
            ) : (
                <Box
                    paddingX={'70px'}
                    width={'full'}
                    mt={'100px'}
                    mb={'50px'}
                    gap={'60px'}
                    alignContent={'center'}
                >
                    <SkeletonCircle size="90" />
                    <SkeletonText
                        mt="4"
                        noOfLines={4}
                        spacing="4"
                        skeletonHeight="10"
                    />
                </Box>
            )}
        </>
    )
}

export default ProductDetails
