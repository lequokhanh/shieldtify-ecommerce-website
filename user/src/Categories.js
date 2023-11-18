import case_cate from "./assets/ProductCategories/case_cate.svg"
import cooler_cate from "./assets/ProductCategories/cooler_cate.svg"
import cpu_cate from "./assets/ProductCategories/cpu_cate.svg"
import graphics_cate from "./assets/ProductCategories/graphics_cate.svg"
import mainboard_cate from "./assets/ProductCategories/mainboard_cate.svg"
import psu_cate from "./assets/ProductCategories/psu_cate.svg"
import ram_cate from "./assets/ProductCategories/ram_cate.svg"
import storage_cate from "./assets/ProductCategories/storage_cate.svg"
import core_i7 from "./assets/core_i7.svg"
import cpu from "./assets/pc/specs/cpu.svg"
import gpu from "./assets/pc/specs/gpu.svg"
import ssd from "./assets/pc/specs/ssd.svg"
import motherboard from "./assets/pc/specs/motherboard.svg"
import ram from "./assets/pc/specs/ram.svg"
import img1 from "./assets/pc/Home1/img1.svg"
import img2 from "./assets/pc/Home1/img2.svg"
import img3 from "./assets/pc/Home1/img3.svg"
import img4 from "./assets/pc/Home1/img4.svg"
import img5 from "./assets/pc/Home1/img5.svg"
import product1 from "./assets/Products/product_img/product1.svg"


const accessoriesCategories = [
    {
        id:1,
        name: "Keyboards",
    },
    {
        id:2,
        name: "Headphones"
    },
    {
        id:3,
        name: "Mice"
    },
    {
        id:4,
        name: "monitor"
    },
    {
        id:5,
        name: "Others"
    }
]
const productCategories = [
    {
        id: 1,
        image: cpu_cate,
        name: "CPUs",
        redir: "CPU"
    },
    {
        id: 2,
        image: cooler_cate,
        name: "CPU coolers",
        redir: "CPUCOOLER"
    },
    {
        id: 3,
        image: mainboard_cate,
        name: "Mainboard",
        redir: "MAINBOARD"
    },
    {
        id: 4,
        image: storage_cate,
        name: "Storage",
        redir: "STORAGE"    
    },
    {
        id: 5,
        image: graphics_cate,
        name: "Graphics card",
        redir: "GPU"
    },
    {
        id: 6,
        image: ram_cate,
        name: "Memory",
        redir: "RAM"
    },
    {
        id: 7,
        image: psu_cate,
        name: "Power supply",
        redir: "PSU"
    },
    {
        id: 8,
        image: case_cate,
        name: "Case",
        redir: "CASE"
    }
];

const testProduct = [
    {
        id: 1,
        name: "CPU Intel Core I5-13600k",
        image: core_i7
    },
    {
        id: 2,
        name: "CPU Intel Core I5-13600k",
        image: core_i7
    },
    {
        id: 3,
        name: "CPU Intel Core I5-13600k",
        image: core_i7
    },
    {
        id: 4,
        name: "CPU Intel Core I5-13600k",
        image: core_i7
    },
    {
        id: 5,
        name: "CPU Intel Core I5-13600k",
        image: core_i7
    },
    {
        id: 6,
        name: "CPU Intel Core I5-13600k",
        image: core_i7
    },
    {
        id: 7,
        name: "CPU Intel Core I5-13600k",
        image: core_i7
    },
    {
        id: 8,
        name: "CPU Intel Core I5-13600k",
        image: core_i7
    },
    {
        id: 9,
        name: "CPU Intel Core I5-13600k",
        image: core_i7
    },
]

const specs = [
    {
        id: 1,
        image: cpu,
        title: "R5 5600X"
    },
    {
        id: 2,
        image: gpu,
        title: "RTX 3050"
    },
    {
        id: 3,
        image: motherboard,
        title: "B550"
    },
    {
        id:4,
        image: ram,
        title: "32GB"
    },
    {
        id:5,
        image: ssd,
        title: "500GB"
    }
]

const carouselImages = [
    {
        id:1,
        url: img1
    },
    {
        id:2,
        url: img2
    },
    {
        id:3,
        url: img3        
    },
    {
        id:4,
        url: img4
    },
    {
        id:5,
        url: img5
    }
]

const testProduct2 = [
    
    {
        id: 1,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 2,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 3,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 4,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 5,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 6,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 7,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 8,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 9,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 10,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 11,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 12,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 13,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 14,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 15,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    },
    {
        id: 16,
        image: product1,
        name: "Gaming monitor BenQ Zowie 25' XL2566K",
        price: "400",
        page: 1,
        category: "monitor"
    }
];

const SortCategories = [
    {
        id:1,
        name: "Most popular"
    },
    {
        id:2,
        name: "Price (Desc)"
    },
    {
        id:3,
        name: "Price (Asc)"
    },
    {
        id:4,
        name: "Name (A-Z)"
    },
    {
        id:5,
        name: "Name (Z-A)"
    }
]

const Brands = [
    {
        id:1,
        name: "Intel"
    },
    {
        id:2,
        name: "AMD"
    },
    {
        id:3,
        name: "Corsair",
    },
    {
        id:4,
        name: "Asus"
    },
    {
        id:5,
        name: "Gigabyte"
    },
    {
        id:6,
        name: "MSI"
    }
]

export { 
    accessoriesCategories, 
    productCategories, 
    testProduct, 
    specs, 
    carouselImages,
    testProduct2, 
    SortCategories,
    Brands  
};

