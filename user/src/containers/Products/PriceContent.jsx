import {
    PopoverArrow,
    Flex,
    Button,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb
} from "@chakra-ui/react"
import PriceTag from "../../components/PriceTag";


const PriceContent = ({values, handleChange, maxPrice}) => {
    const submitPrice = (values) => {
        const { search, pathname } = window.location;
        const queryParams = new URLSearchParams(search);
        queryParams.set('priceRange', `${values[0]}-${values[1]}`);
        queryParams.set('page', '1');
        const newSearch = queryParams.toString();
        window.location.href = `${pathname}?${newSearch}`;
    }
    return (
        <Flex>
            <PopoverArrow/>
                <Flex 
                padding="30px 30px"
                gap="20px"
                w="100% "
                flexDir="column"
                >
                    <Flex gap="20px">
                        <PriceTag price={values[0]}/>
                        <RangeSlider
                        min={10}
                        max={maxPrice}
                        defaultValue={values}
                        value={values}
                        onChange={handleChange}
                        step={20}
                        w="300px"
                        >
                            <RangeSliderTrack>
                                <RangeSliderFilledTrack/>
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0}/>
                            <RangeSliderThumb index={1}/>
                        </RangeSlider>
                        <PriceTag price={values[1]}/>
                    </Flex>
                    <Button
                    bgColor="#2D2D2D"
                    borderRadius="25px"
                    colorScheme="blackAlpha"
                    onClick={() => submitPrice(values)}
                    >
                        Submit
                    </Button>
                </Flex>
        </Flex>
        
    )
}

export default PriceContent;