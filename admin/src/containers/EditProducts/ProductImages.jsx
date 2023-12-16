import {
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Heading,
    Image,
    Input,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";
import rmove from "../../assets/Products/rmove.svg";
import AddImageBox from "../../components/AddImageBox";
import { useContext, useEffect, useState } from "react";
import add_blue from "../../assets/add_blue.svg";
import ticked from "../../assets/EditProducts/ticked.svg";
import { Field, Form, Formik } from "formik";
import WarningPrimaryModal from "../../components/WarningModal";
import { deleteImageFromProduct } from "../../utils/api";
import ConfirmModal from "../../components/ConfirmModal";
import { AuthContext } from "../../context/auth.context";

const ProductsImages = ({
    currentImgs,
    setCurrentImgs,
    imgUpdateState,
    setImgUpdateState,
    productID,
}) => {
    const toast = useToast();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [primaryImage, setPrimaryImage] = useState("");
    const [imgLink, setImgLink] = useState("");
    const { currentUser } = useContext(AuthContext);
    const removeImage = async () => {
        await deleteImageFromProduct({ productID, imgid: selectedImage.uid })
            .then(() => {
                toast({
                    title: "Success",
                    description: "Image removed successfully",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                setCurrentImgs(currentImgs.filter((img) => img !== selectedImage));
                setSelectedImage("");
            })
            .catch(() => {
                toast({
                    title: "Error",
                    description: "Failed to remove image",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            });
    };
    useEffect(() => {
        setPrimaryImage(currentImgs.find((img) => img.is_primary === true));
    }, [currentImgs]);
    useEffect(() => {
        if (selectedImage !== "") {
            setIsInputOpen(false);
        }
    }, [selectedImage]);
    return (
        <Flex flexDir="column" fontFamily="Inter" gap="12px">
            <Heading color="#424856" fontSize="0.875rem" fontWeight="700">
                Product specification
            </Heading>
            {
                currentUser && currentUser.role === "admin" || currentUser.role === "superadmin" && (
                    <Flex display={isInputOpen ? "none" : "flex"} gap="8px">
                        <Image
                            src={rmove}
                            alt="remove"
                            onClick={() => {
                                if (selectedImage === "") {
                                    toast({
                                        title: "Error",
                                        description: "Please select an image to remove",
                                        status: "error",
                                        duration: 2000,
                                        isClosable: true,
                                    });
                                    return;
                                }
                                if (selectedImage === primaryImage) {
                                    onOpen();
                                    return;
                                }
                                setIsConfirmOpen(true);
                            }}
                            _hover={{ cursor: "pointer" }}
                        />
                        <Divider orientation="vertical" />
                        <Checkbox
                            isChecked={selectedImage === primaryImage}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setPrimaryImage(selectedImage);
                                    setImgUpdateState({
                                        ...imgUpdateState,
                                        primaryImg: selectedImage,
                                    });
                                }
                            }}
                        >
                            Primary image
                        </Checkbox>
                    </Flex>
                )
            }
            {
                currentUser && currentUser.role === "admin" || currentUser.role === "superadmin" && (
                    <Formik
                        initialValues={{ imgLink: "" }}
                        onSubmit={() => {
                            if (currentImgs.length === 0) {
                                setCurrentImgs([{ link: imgLink, is_primary: true }]);
                                setImgUpdateState({
                                    ...imgUpdateState,
                                    addedImgs: [
                                        ...imgUpdateState.addedImgs,
                                        {
                                            link: imgLink,
                                            is_primary: true,
                                        },
                                    ],
                                });
                            } else {
                                setCurrentImgs([
                                    ...currentImgs,
                                    { link: imgLink, is_primary: false },
                                ]);
                                setImgUpdateState({
                                    ...imgUpdateState,
                                    addedImgs: [
                                        ...imgUpdateState.addedImgs,
                                        {
                                            link: imgLink,
                                            is_primary: false,
                                        },
                                    ],
                                });
                            }
                            setIsInputOpen(false);
                        }}
                    >
                        
                        {(props) => (
                            <Form>
                                <Field name="imgLink">
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={form.errors.imgLink && form.touched.imgLink}
                                        >
                                            <Flex display={!isInputOpen && "none"}>
                                                <FormLabel
                                                    color="shieldtify.200"
                                                    fontSize="0.875rem"
                                                    fontWeight="600"
                                                >
                                                    Image URL
                                                </FormLabel>
                                                <Flex gap="12px">
                                                    <Input
                                                        {...field}
                                                        bgColor="#F3F4F6"
                                                        borderRadius="12px"
                                                        border="none"
                                                        value={imgLink}
                                                        onChange={(e) => {
                                                            setImgLink(e.target.value);
                                                        }}
                                                    />
                                                    <Image
                                                        src={add_blue}
                                                        alt="Add image"
                                                        onClick={props.submitForm}
                                                        // isLoading={props.isSubmitting}
                                                        _hover={{
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                </Flex>
                                            </Flex>
                                            <FormErrorMessage>{form.errors.imgLink}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Form>
                        )}
                    </Formik>
                )
            }
            <Grid gridTemplateColumns="repeat(3, 1fr)" gap="15px">
                {
                    currentUser && currentUser.role === "admin" || currentUser.role === "superadmin" && (
                        <AddImageBox
                            setIsInputOpen={setIsInputOpen}
                            setSelectedImage={setSelectedImage}
                            isInputOpen={isInputOpen}
                        />
                    )
                }
                {currentImgs.map((img, index) => (
                    <Flex
                        key={index}
                        borderRadius="6px"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                            setSelectedImage(img);
                        }}
                        border={primaryImage === img && "3px solid #FF6262"}
                        position="relative"
                    >
                        <Image
                            src={img.link}
                            alt="product image"
                            w="80px"
                            h="80px"
                            objectFit="contain"
                        />
                        <Image
                            bgColor="#FFFFFF"
                            src={ticked}
                            alt="ticked"
                            position="absolute"
                            top="-2"
                            right="-2"
                            display={selectedImage === img ? "block" : "none"}
                        />
                    </Flex>
                ))}
            </Grid>
            <WarningPrimaryModal
                isOpen={isOpen}
                onClose={onClose}
                title="Cannot delete primary image"
            />
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                handleAction={removeImage}
                message="This action will delete the selected image, please check
                your action carefully."
            />
        </Flex>
    );
};

export default ProductsImages;
