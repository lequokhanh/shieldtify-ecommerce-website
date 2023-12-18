/* eslint-disable react/prop-types */
import { createContext , useState } from "react";
import { 
    createBrand, 
    addImagesToProduct, 
    setPrimaryImage,
    createNewProduct,
    deleteImageFromProduct,
    updateProductForStaff,
} from "../utils/api";
import { updateProduct } from "../utils/api";

export const ProductsContext = createContext({
    isOnProducts: false,
    setIsOnProducts: () => {},
    categories: [],
    setCategories: () => {},
    products: [],
    setProducts: () => {},
    currentCategories: "CPUCOOLER",
    setCurrentCategories: () => {},
    totalProducts: 0,
    setTotalProducts: () => {},
    totalPages: 0,
    setTotalPages: () => {},
    currentPage: 1,
    setCurrentPage: () => {},
    brands: [],
    setBrands: () => {},
    currentBrands: [],
    setCurrentBrands: () => {},
    searchValue: '',
    setSearchValue: () => {},
    callUpdateProduct: () => {},
    callCreateNewProduct: () => {},
    callRemoveImage: () => {},
    allBrands: [],
    setAllBrands: () => {},
    allBrandsName: [],
    setAllBrandsName: () => {},
    totalProductsInCategory: 0,
    setTotalProductsInCategory: () => {},
    callUpdateProductStaff: () => {},
});

export const ProductsProvider = ({children}) => {
    const [isOnProducts, setIsOnProducts] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCategories, setCurrentCategories] = useState("CPUCOOLER");
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [brands, setBrands] = useState([]);
    const [currentBrands, setCurrentBrands] = useState([]);
    const [ searchValue, setSearchValue ] = useState('');
    const [allBrands, setAllBrands] = useState([]);
    const [allBrandsName, setAllBrandsName] = useState([]);
    const [totalProductsInCategory, setTotalProductsInCategory] = useState(0);

    const callUpdateProductStaff = async({product}) => {
        await updateProductForStaff(product);
    }

    const callUpdateProduct = async ({product},type) => {
        if(type==="disable"){
            await updateProduct(product).catch(err => console.log(err)).then((res) =>{
                let brand = allBrands.find((item) => item.uid === res.data.data.brandid).name;
                const newProduct = {
                    uid: res.data.data.uid,
                    name: res.data.data.name,
                    price: res.data.data.price,
                    stock_qty: res.data.data.stock_qty,
                    brand: brand,
                }
                console.log(newProduct);
                const updatedProducts = products.map(p => p.uid === newProduct.uid ? newProduct : p);
                setProducts(updatedProducts);
            });
            return;
        }
        const brand = allBrands.find((item) => item.name  === product.brand) || null;
        if(brand){
            product.brandid = brand.uid;
            await updateProduct(product).catch(err => console.log(err));
        }else{
            await createBrand({name: product.brand}).then((res) => {
                updateProduct({
                    ...product,
                    brandid: res.data.uid,
                })
            }).catch(err => console.log(err));
        }
        if(product.img.addedImgs.length > 0){
            await addImagesToProduct({
                productID: product.productID,
                imgs: product.img.addedImgs,
            })
        }
        if(product.img.primaryImg !== ""){
            await setPrimaryImage({
                productID: product.productID,
                imgid: product.img.primaryImg.uid,
            })
        }
    }
    const callRemoveImage = async ({productID, image}) => {
        await deleteImageFromProduct({
            productID: productID,
            image: image,
        })
    }
    const callCreateNewProduct = async ({product}) => {
        const brandid = allBrands.find((item) => item.name  === product.brand).uid;
        if(brandid){
            product.brandid = brandid;
            await createNewProduct(product).catch(err => console.log(err));
        }else{
            await createBrand({name: product.brand}).then((res) => {
                createNewProduct({
                    ...product,
                    brandid: res.data.uid,
                });
            }).catch(err => console.log(err));
        }
        if(product.img.addedImgs.length > 0){
            await addImagesToProduct({
                productID: product.productID,
                images: product.img.addedImgs,
            })
        }
        if(product.img.primaryImg !== ""){
            await setPrimaryImage({
                productID: product.productID,
                image: product.img.primaryImage,
            })
        }
    }
    const value = {
        isOnProducts,
        setIsOnProducts,
        products,
        setProducts,
        categories,
        setCategories,
        currentCategories,
        setCurrentCategories,
        totalProducts,
        setTotalProducts,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage,
        brands,
        setBrands,
        currentBrands,
        setCurrentBrands,
        searchValue,
        setSearchValue,
        callUpdateProduct,
        callCreateNewProduct,
        callRemoveImage,
        allBrands,
        setAllBrands,
        allBrandsName,
        setAllBrandsName,
        totalProductsInCategory,
        setTotalProductsInCategory,
        callUpdateProductStaff,
    }
    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
}