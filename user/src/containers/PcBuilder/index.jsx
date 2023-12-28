import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    Text,
    VStack,
    useToast,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import ComponentPickingTable from './ComponentPickingTable'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import BuilderModal from './BuilderModal'
import { CartContext } from '../../context/cart.context'
import { defaultComponentValue } from '../../Categories'
import { AuthContext } from '../../context/auth.context'
import { useNavigate } from 'react-router-dom'
import ConfirmBuildModal from './ConfirmBuildModal'

const PcBuilder = () => {
    const navigate = useNavigate()
    const getInitialComponentState = () => {
        const components = localStorage.getItem('components')
        return components ? JSON.parse(components) : defaultComponentValue
    }
    const getIntialcomponentTotalState = () => {
        const componentTotal = localStorage.getItem('componentTotal')
        return componentTotal ? JSON.parse(componentTotal) : 0
    }
    const checkAllComponentsZero = () => {
        return components.every((component) => component.quantity === 0)
    }
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [components, setComponents] = useState(getInitialComponentState)
    const [componentTotal, setComponentTotal] = useState(
        getIntialcomponentTotalState
    )
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentCategory, setCurrentCategory] = useState('')
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
    const { isLoggedIn } = useContext(AuthContext)
    const { addItemToCart, clearCart } = useContext(CartContext)
    const [visibleRamCount, setVisibleRamCount] = useState(
        components.filter(
            (component) =>
                component.category === 'RAM' && component.quantity > 0
        ).length
    )
    const [visibleStorageCount, setVisibleStorageCount] = useState(
        components.filter(
            (component) =>
                component.category === 'Storage' && component.quantity > 0
        ).length
    )
    const toast = useToast()

    useEffect(() => {
        localStorage.setItem('components', JSON.stringify(components))
        localStorage.setItem('componentTotal', JSON.stringify(componentTotal))
    }, [components, componentTotal])
    useEffect(() => {
        setVisibleRamCount(
            components.filter(
                (component) =>
                    component.category === 'Ram' && component.quantity > 0
            ).length
        )
        setVisibleStorageCount(
            components.filter(
                (component) =>
                    component.category === 'Storage' && component.quantity > 0
            ).length
        )
    }, [components])
    const handleKeep = async () => {
        let newComponents = components.filter((item) => item.quantity > 0)
        let groupedComponents = Object.values(
            newComponents.reduce((acc, item) => {
                if (!acc[item.uid]) {
                    acc[item.uid] = { item: item.uid, quantity: 0 }
                }
                acc[item.uid].quantity += item.quantity
                return acc
            }, {})
        )
        addItemToCart({
            item: groupedComponents,
            addType: 'multiple',
            setComponentTotal,
            setComponents,
            type: 'builder',
        })
    }
    const handleRemove = async () => {
        let newComponents = components.filter((item) => item.quantity > 0)
        let groupedComponents = Object.values(
            newComponents.reduce((acc, item) => {
                if (!acc[item.uid]) {
                    acc[item.uid] = { item: item.uid, quantity: 0 }
                }
                acc[item.uid].quantity += item.quantity
                return acc
            }, {})
        )
        clearCart().then(() => {
            addItemToCart({
                item: groupedComponents,
                addType: 'multiple',
                type: 'builder',
                setComponentTotal,
                setComponents,
            })
        })
    }

    return (
        <Flex
            flexDir="column"
            fontFamily="Inter"
            mt="100px"
            w="full"
            gap="70px"
            paddingX="81px"
        >
            <VStack alignItems="flex-start" gap="15px">
                <Heading
                    color="shieldtify.100"
                    fontWeight="700"
                    fontSize="2.5rem"
                >
                    Pick Parts. Build Your PC.
                </Heading>
                <Text
                    color="#545454"
                    fontSize="1.5rem"
                    fontWeight="300"
                    noOfLines={2}
                >
                    We provide part selection, pricing, and compatibility
                    guidance for do-it-yourself computer builders.
                </Text>
                <Box w="full">
                    <ComponentPickingTable
                        components={components}
                        setComponents={setComponents}
                        setCurrentCategory={setCurrentCategory}
                        openModal={() => setIsModalOpen(true)}
                        componentTotal={componentTotal}
                        setComponentTotal={setComponentTotal}
                        currentCategoryIndex={currentCategoryIndex}
                        setCurrentCategoryIndex={setCurrentCategoryIndex}
                        visibleRamCount={visibleRamCount}
                        setVisibleRamCount={setVisibleRamCount}
                        visibleStorageCount={visibleStorageCount}
                        setVisibleStorageCount={setVisibleStorageCount}
                    />
                </Box>
                <Flex
                    flexDir="column"
                    alignItems={'flex-end'}
                    gap="30px"
                    w="full"
                >
                    <VStack>
                        <HStack gap="70px">
                            <Text
                                color="shieldtify.100"
                                fontSize="2rem"
                                fontWeight="700"
                            >
                                Total
                            </Text>
                            <Text
                                color="#FF6262"
                                fontSize="2rem"
                                fontWeight="400"
                            >
                                {parseFloat(componentTotal.toFixed(2))}$
                            </Text>
                        </HStack>
                        <Button
                            variant="addToCart"
                            w="full"
                            onClick={() => {
                                if (checkAllComponentsZero()) {
                                    toast({
                                        title: 'Error',
                                        description:
                                            'Please pick at least one component',
                                        status: 'error',
                                        duration: 2000,
                                        isClosable: true,
                                    })
                                } else {
                                    if (!isLoggedIn) {
                                        toast({
                                            title: 'Error',
                                            description:
                                                'Please login to add to cart',
                                            status: 'error',
                                            duration: 2000,
                                            isClosable: true,
                                        })
                                        navigate('/sign-in')
                                        return
                                    }
                                    setIsConfirmOpen(true)
                                    // components.map((component) => {
                                    //     if(component.quantity > 0){
                                    //         addItemToCart({
                                    //                 item: {
                                    //                     uid: component.uid,
                                    //                     quantity: component.quantity,
                                    //                 },
                                    //                 type: "builder"
                                    //         });
                                    //         setComponentTotal(0);
                                    //         setComponents(defaultComponentValue);
                                    //     }
                                    // })
                                    // toast({
                                    //     title: "Success",
                                    //     description: "PC Build added to cart",
                                    //     status: "success",
                                    //     duration: 2000,
                                    //     isClosable: true,
                                    // })
                                }
                            }}
                        >
                            <Text fontFamily="Roboto">Add to Cart</Text>
                            <ArrowForwardIcon />
                        </Button>
                    </VStack>
                </Flex>
            </VStack>
            <BuilderModal
                isOpen={isModalOpen}
                ModalOnClose={() => {
                    setIsModalOpen(false)
                    setCurrentCategory('')
                }}
                setCurrentCategoryIndex={setCurrentCategoryIndex}
                category={currentCategory}
                setIsModalOpen={setIsModalOpen}
                setComponents={setComponents}
                components={components}
                setComponentTotal={setComponentTotal}
                componentTotal={componentTotal}
                currentCategoryIndex={currentCategoryIndex}
                visibleRamCount={visibleRamCount}
                setVisibleRamCount={setVisibleRamCount}
                visibleStorageCount={visibleStorageCount}
                setVisibleStorageCount={setVisibleStorageCount}
            />
            <ConfirmBuildModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                handleKeep={handleKeep}
                handleRemove={handleRemove}
            />
        </Flex>
    )
}

export default PcBuilder
