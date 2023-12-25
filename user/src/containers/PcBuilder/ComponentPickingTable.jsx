import { Table, TableContainer, Tbody, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import TableRow from "./TableRow";

const ComponentPickingTable = ({ 
    components, 
    setComponents, 
    setCurrentCategory, 
    openModal, 
    setComponentTotal, 
    setCurrentCategoryIndex,
    currentCategoryIndex,
    visibleRamCount,
    visibleStorageCount,
    setVisibleRamCount,
    setVisibleStorageCount,
}) => {
    const toast = useToast();

    const removeItem = (component,selectedIndex) => {
        let total=0;
        const NewComponents= components.map((item, index) => {
            if(index === selectedIndex){
                if(
                component.category === "Ram" && visibleRamCount > 1
                || component.category === "Storage" && visibleStorageCount > 1
                ){
                    return;
                }else if(
                component.category === "Ram" && visibleRamCount === 1
                ||component.category === "Storage" && visibleStorageCount === 1||
                component.category !== "Ram" && component.category !== "Storage"){
                    return {
                        category: item.category,
                        quantity: 0,
                    }
                }
            }
            if(item.quantity && item.price){
                total = parseFloat((total + (item.quantity*item.price)).toFixed(2));
            }
            return item;
        });
        console.log(NewComponents);
        setComponents(NewComponents.filter((item) => item !== undefined)); 
        setComponentTotal(total);
    }
    const decreaseCartQuantity = (component,selectedIndex) => {
        let total=0;
        if(component.quantity > 1) {
            setComponents(components.map((item,index) => {
                if(index === selectedIndex){
                    total += parseFloat((item.price*(item.quantity-1)).toFixed(2));
                    return {
                        ...item,
                        quantity: item.quantity-1,
                    }
                }else{
                    if(item.quantity && item.price){
                        total = parseFloat((total + (item.quantity*item.price)).toFixed(2));
                    }
                }
                setComponentTotal(total);
                return item;
            }))
        }
    }
    const increaseCartQuantity = (component,selectedIndex) => {
        let total = 0;
        if(component.quantity === component.stock_qty){
            toast({
                title: "Error",
                description: "Quantity exceeds stock quantity",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            return;
        }else{
            setComponents(components.map((item,index) => {
                if(index === selectedIndex){
                    total = parseFloat((total + ((item.quantity+1)*item.price)).toFixed(2))
                    return {
                        ...item,
                        quantity: item.quantity+1,
                    }
                }else{
                    if(item.quantity && item.price){
                        total = parseFloat((total + (item.quantity*item.price)).toFixed(2))                
                    }
                }
                setComponentTotal(total);
                return item;
            }))
        }
    }
    console.log(visibleRamCount, visibleStorageCount);
    return (
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th color="shieldtify.100" fontSize={"1.5rem"}>Component</Th>
                        <Th color="shieldtify.100" fontSize={"1.5rem"}  w="500px">Selection</Th>
                        <Th color="shieldtify.100" fontSize={"1.5rem"} textAlign="center">Unit Price</Th>
                        <Th color="shieldtify.100" fontSize={"1.5rem"} textAlign="center">Quantity</Th>
                        <Th color="shieldtify.100" fontSize={"1.5rem"}>Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {components.map((component, index) => {
                        if(((component.category==="Ram" && visibleRamCount === 0 && component.description) 
                        || (component.category==="Storage" && visibleStorageCount === 0 && component.description))){
                            return null;
                        }else{
                            return (
                                <TableRow
                                key={index} 
                                index={index} 
                                component={component} 
                                setCurrentCategory={setCurrentCategory} 
                                openModal={openModal} 
                                decreaseCartQuantity={decreaseCartQuantity} 
                                increaseCartQuantity={increaseCartQuantity} 
                                setComponents={setComponents} 
                                setComponentTotal={setComponentTotal} 
                                components={components} 
                                removeItem={removeItem}     
                                setCurrentCategoryIndex={setCurrentCategoryIndex}
                                />
                            );
                        }
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default ComponentPickingTable;