import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    ListItem,
    Text,
    UnorderedList,
    Box,
    Button,
} from '@chakra-ui/react'

const SpecificationModal = ({ isOpen, onClose, specification }) => {
    const specsJSON = JSON.parse(specification)

    return (
        <Modal
            blockScrollOnMount={'false'}
            isOpen={isOpen}
            onClose={onClose}
            size={'xl'}
        >
            <ModalOverlay />
            <ModalContent borderRadius={'10px'}>
                <ModalHeader
                    bgColor={'#2D2D2D'}
                    color={'white'}
                    borderTopRadius={'10px'}
                >
                    Specifications
                </ModalHeader>
                <ModalCloseButton
                    bgColor={'white'}
                    borderRadius={'50%'}
                    size={'sm'}
                    mt={'10px'}
                    mr={'10px'}
                />
                <ModalBody>
                    <UnorderedList>
                        {Object.keys(specsJSON).map((specsKey) => {
                            const spec = specsJSON[specsKey]
                            return (
                                <Box key={specsKey}>
                                    <Heading
                                        as="h4"
                                        size="md"
                                        mb={'10px'}
                                        mt={'10px'}
                                        fontWeight={'800'}
                                        textDecoration={'underline'}
                                    >
                                        {specsKey}
                                    </Heading>

                                    <UnorderedList>
                                        {Object.keys(spec).map(
                                            (specDetailKey) => {
                                                const specDetail =
                                                    spec[specDetailKey]
                                                return (
                                                    <ListItem
                                                        key={specDetailKey}
                                                        ml="10px"
                                                    >
                                                        <Text
                                                            fontSize={'20px'}
                                                            fontWeight={'600'}
                                                        >
                                                            {specDetailKey
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                specDetailKey
                                                                    .slice(1)
                                                                    .replace(
                                                                        '_',
                                                                        ' '
                                                                    )}
                                                            :{' '}
                                                            <span className="font-normal">
                                                                {specDetail}
                                                            </span>
                                                        </Text>
                                                    </ListItem>
                                                )
                                            }
                                        )}
                                    </UnorderedList>
                                </Box>
                            )
                        })}
                    </UnorderedList>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blackAlpha"
                        bgColor="#2D2D2D"
                        onClick={onClose}
                        borderRadius="25px"
                        w={'100%'}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SpecificationModal
