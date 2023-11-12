import case_cate from "./assets/ProductCategories/case_cate.svg"
import cooler_cate from "./assets/ProductCategories/cooler_cate.svg"
import cpu_cate from "./assets/ProductCategories/cpu_cate.svg"
import graphics_cate from "./assets/ProductCategories/graphics_cate.svg"
import mainboard_cate from "./assets/ProductCategories/mainboard_cate.svg"
import psu_cate from "./assets/ProductCategories/psu_cate.svg"
import ram_cate from "./assets/ProductCategories/ram_cate.svg"
import storage_cate from "./assets/ProductCategories/storage_cate.svg"
import core_i7 from "./assets/core_i7.png"
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
        name: "Monitors"
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
        name: "CPUs"
    },
    {
        id: 2,
        image: cooler_cate,
        name: "CPU coolers"
    },
    {
        id: 3,
        image: mainboard_cate,
        name: "Mainboard"
    },
    {
        id: 4,
        image: storage_cate,
        name: "Storage"
    },
    {
        id: 5,
        image: graphics_cate,
        name: "Graphics card"
    },
    {
        id: 6,
        image: ram_cate,
        name: "Memory"
    },
    {
        id: 7,
        image: psu_cate,
        name: "Power supply"
    },
    {
        id: 8,
        image: case_cate,
        name: "Case"
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

export { accessoriesCategories, productCategories, testProduct, specs, carouselImages};
