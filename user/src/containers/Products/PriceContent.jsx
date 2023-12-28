import {
    PopoverArrow,
    Flex,
    Button,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb,
} from '@chakra-ui/react'
import PriceTag from '../../components/PriceTag'

const PriceContent = ({ values, onSubmit, maxPrice, handleChange }) => {
    return (
        <Flex>
            <PopoverArrow />
            <Flex padding="30px 30px" gap="20px" w="100% " flexDir="column">
                <Flex gap="20px">
                    <PriceTag price={values ? values[0] : 10} />
                    <RangeSlider
                        min={10}
                        max={maxPrice}
                        defaultValue={[10, maxPrice]}
                        value={values ? values : [10,maxPrice]}
                        onChange={handleChange}
                        step={20}
                        w="300px"
                    >
                        <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} />
                        <RangeSliderThumb index={1} />
                    </RangeSlider>
                    <PriceTag price={values ? values[1] : maxPrice} />
                </Flex>
                <Button
                    bgColor="#2D2D2D"
                    borderRadius="25px"
                    colorScheme="blackAlpha"
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Flex>
        </Flex>
    )
}

export default PriceContent
