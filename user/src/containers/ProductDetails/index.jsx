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
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../../utils/api.js'
import MarkdownRenderer from './markdownRenderer'
import SpecificationModal from '../../components/SpecificationModal'
import shieldtify_logo from '../../assets/Product/shieldtify-logo.svg'

const PreviewSpecs = (product) => {
    const jsonProductSpecs = JSON.parse(product.specification)
    let cnt = 0
    const specsArray = []
    for (const [key, value] of Object.entries(jsonProductSpecs)) {
        for (const [key2, value2] of Object.entries(value)) {
            if (cnt === 6) break

            if (value2 !== null && value2 !== undefined && value2 !== '') {
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
                cnt++
            }
        }
    }

    return specsArray
}

const ProductDetails = () => {
    const [markdown, setMarkdown] = useState('')
    const [product, setProduct] = useState(null)
    const [selectedImg, setSelectedImg] = useState(shieldtify_logo)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { id } = useParams()

    // fetch product data from api
    useEffect(() => {
        async function fetchData() {
            await getProduct(id)
                .then((res) => {
                    setProduct(res.data.data)
                    console.log(product)
                    setMarkdown(
                        res.data.data.description
                            ? res.data.data.description
                            : 'No description available'
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
            console.log(product)
        }
        fetchData()
    }, [])

    return (
        <>
            {product && (
                <Flex
                    paddingX={'70px'}
                    width={'full'}
                    mt={'100px'}
                    mb={'50px'}
                    flexDir={'column'}
                    fontFamily={'Inter, sans-serif'}
                    gap={'10px'}
                    alignContent={'center'}
                >
                    <Flex gap={'80px'} justifyContent={'center'}>
                        <Flex
                            flexDir={'column'}
                            fontFamily={'Inter, sans-serif'}
                            gap={'20px'}
                            justifyContent={'center'}
                        >
                            <Image
                                src={
                                    product.imgs.length >= 1
                                        ? selectedImg
                                        : shieldtify_logo
                                }
                            />
                            <Grid templateColumns="repeat(5, 1fr)" gap={'25px'}>
                                {product.imgs.length >= 1 &&
                                    product.imgs.map((item, index) => (
                                        <Box
                                            key={index}
                                            w={'100px'}
                                            h={'100px'}
                                            border={'2px solid #919EAB'}
                                            borderRadius={'10px'}
                                            bgSize={'contain'}
                                            onClick={() => {
                                                setSelectedImg(item.img)
                                            }}
                                        >
                                            <Image src={item.img} p={'12px'} />
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
                            w={'max-content'}
                            mt={'50px'}
                            gap={'10px'}
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
                            <Box mt={'40px'}>
                                <Text
                                    as="u"
                                    fontSize="1.5rem"
                                    fontWeight={'700'}
                                    color={'#2D2D2D'}
                                >
                                    Specification
                                </Text>
                                <Flex flexDir={'column'} ml={'40px'} mt={'5px'}>
                                    <UnorderedList>
                                        {PreviewSpecs(product).map(
                                            (item, index) => {
                                                return (
                                                    <ListItem key={index}>
                                                        <Text
                                                            fontSize={'1.25rem'}
                                                            fontWeight={'600'}
                                                            color={'#2D2D2D'}
                                                        >
                                                            {Object.keys(item)}:{' '}
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
                            <Flex flexDir={'row'} gap={'20px'} mt={'50px'}>
                                <Button
                                    colorScheme="blackAlpha"
                                    bgColor="#2D2D2D"
                                    color="#FFFFFF"
                                    type="submit"
                                    borderRadius="25px"
                                    fontWeight={'500'}
                                    fontSize="1.25rem"
                                    fontFamily={'Roboto, sans-serif'}
                                    width={'400px'}
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
                                    width={'400px'}
                                    height={'50px'}
                                    gap={'5px'}
                                >
                                    <span>+</span>Add to cart
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Box
                        color={'#2D2D2D'}
                        fontSize={'2rem'}
                        fontWeight={'700'}
                        mt={'10px'}
                    >
                        Description
                    </Box>
                    <Box bgColor={'#EAEAEA'} p={'50px'} borderRadius={'10px'}>
                        <MarkdownRenderer markdown={markdown} />
                    </Box>
                </Flex>
            )}
        </>
    )
}

export default ProductDetails
