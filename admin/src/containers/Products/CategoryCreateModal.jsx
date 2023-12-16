import { 
    Modal, 
    ModalCloseButton, 
    ModalContent, 
    ModalOverlay,
    ModalHeader,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    useToast,
} from "@chakra-ui/react"
import { Field, Formik, Form } from "formik";
import { createCategory, updateCategory } from "../../utils/api";
import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";

const CategoryCreateModal = ({isOpen,onClose,editType,checkedCategory}) => {
    const { categories, setCategories} = useContext(ProductsContext);
    const toast = useToast();
    const handleSubmit = async (values) => {
        if(editType==="Create"){
            await createCategory({
                name: values.cateName,
                description: values.description,
            }).then((res) => {
                toast({
                    title: 'Success',
                    description: 'Category created successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setCategories([...categories,{
                    uid: res.data.data.uid,
                    name: res.data.data.name,
                    description: res.data.data.description,
                }])
                onClose();
            }).catch(() => {
                toast({
                    title: 'Error',
                    description: 'Category creation failed',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            })
        }else if(editType==="Edit"){
            await updateCategory({
                name: values.cateName,
                description: values.description,
                uid: checkedCategory.uid,
            }).then((res) => {
                toast({
                    title: 'Success',
                    description: 'Category updated successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setCategories(categories.map((category) => {
                    if(category.uid === checkedCategory.uid){
                        return {
                            uid: res.data.data.uid,
                            name: res.data.data.name,
                            description: res.data.data.description,
                        }
                    }
                    return category;
                }))
                onClose();
            }).catch(() => {
                toast({
                    title: 'Error',
                    description: 'Category update failed',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            })
        }
    };

    return (
        <Modal
        isOpen={isOpen}
        blockScrollOnMount={false}
        onClose={onClose}
        size="lg"
        fontFamily="Inter"
        >
            <ModalOverlay/>
            <ModalContent
            borderRadius="10px"
            minH="420px"
            >
                    <ModalHeader
                            bgColor="#2D2D2D"
                            color="white"
                            borderTopRadius="10px"
                            >
                            Category details
                    </ModalHeader>
                    <ModalCloseButton
                        bgColor="white"
                        borderRadius="50%"
                        size="sm"
                        mt="10px"
                        mr="10px"
                    /> 
                    <Flex justifyContent="center" py="28px">
                        <Formik
                        initialValues={{
                            cateName:  editType === "Edit" ? checkedCategory.name : "",
                            description: editType === "Edit" ? checkedCategory.description : "",
                        }}
                        onSubmit={handleSubmit}
                        >
                            <Form>
                                <Flex flexDir="column" gap="20px" w="410px">
                                    <Field name="cateName">
                                        {({field}) => (
                                            <FormControl>
                                                <FormLabel color="#424856" fontWeight="700">
                                                    Category
                                                </FormLabel>
                                                <Input 
                                                {...field}
                                                padding="7px 55px 6px 12px" 
                                                bgColor="#F3F4F6" 
                                                border="none"
                                                borderRadius="12px"
                                                fontSize="0.875rem"
                                                fontWeight="400"
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="description">
                                        {({field}) => (
                                            <FormControl>
                                                <FormLabel color="#424856" fontWeight="700">
                                                    Description
                                                </FormLabel>
                                                <Textarea
                                                {...field}
                                                bgColor="#F3F4F6" 
                                                border="none"
                                                color="shieldtify.checkout"
                                                borderRadius="12px"
                                                fontSize="0.875rem"
                                                fontWeight="400"
                                                h="169px"
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Button 
                                    borderRadius="25px" 
                                    bgColor="shieldtify.100" 
                                    color="white" 
                                    colorScheme="blackAlpha"
                                    fontFamily="Roboto" 
                                    w="full"
                                    type="submit"
                                    >
                                        Save
                                    </Button>
                                </Flex>
                            </Form>
                        </Formik>
                    </Flex>
            </ModalContent>
        </Modal>
    )
}

export default CategoryCreateModal;