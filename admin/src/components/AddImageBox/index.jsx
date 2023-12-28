import {
    Box,
    Image,
} from '@chakra-ui/react'
import add from '../../assets/add.svg'

const AddImageBox = ({setIsInputOpen,setSelectedImage, isInputOpen}) => {
    const handleClick = () => {
        if (setIsInputOpen) {
            setIsInputOpen(!isInputOpen);
            setSelectedImage("");
        }
    }
    return(
        <Box 
        w="max-content" 
        padding='28px' 
        border="2px dashed #BDC1CA" 
        bgColor="#FAFAFB"
        borderRadius="6px"
        _hover={{
            cursor: "pointer"
        }}
        onClick={handleClick}
        >
            <Image src={add} alt="add"/>

        </Box>
    )
}

export default AddImageBox;