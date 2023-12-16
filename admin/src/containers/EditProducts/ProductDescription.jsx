import {
    Flex,
} from "@chakra-ui/react"
import Dante from "dante3/package/esm";
const empty = `<p class="graf graf--p"></p>`;
const ProductDescription = ({product, setCurrentDescription}) => {
    return(
        <Flex 
        flexDir="column" 
        fontFamily="Inter" 
        w="70%" 
        border="1px solid #cbd5e0" 
        borderRadius="12px"
        p="10px"
        >
            <Dante
            content={product.description}
            onUpdate={(editor) => {
                if(editor.getHTML()!==empty){
                    setCurrentDescription(editor.getHTML());
                }
            }}
            />
        </Flex>
        )
}

export default ProductDescription;