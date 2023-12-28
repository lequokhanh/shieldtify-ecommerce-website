import dashboard from "./assets/SideBar/dashboard.svg";
import forums from "./assets/SideBar/forums.svg";
import orders from "./assets/SideBar/orders.svg";
import products from "./assets/SideBar/products.svg";
import promotions from "./assets/SideBar/promotions.svg";
import users from "./assets/SideBar/users.svg";
import img1 from "./assets/Products/ProductImagesTest/img1.svg"
import img2 from "./assets/Products/ProductImagesTest/img2.svg"
import img3 from "./assets/Products/ProductImagesTest/img3.svg"

const testImage = [
    {
        id:1,
        image: img1
    },
    {
        id:2,
        image: img2
    },
    {
        id:3,
        image: img3
    }
]

const manageCategories = [
    {
        id: 1,
        name: "Dashboard",
        match: "dashboard",
        icon: dashboard,
    },
    {
        id: 2,
        name: "Forums",
        match: "forums",
        icon: forums,
    },
    {
        id: 3,
        name: "Orders",
        match: "orders",
        icon: orders,
    },
    {
        id: 4,
        name: "Products",
        match: "products",
        icon: products,
    },
    {
        id: 5,
        name: "Promotions",
        match: "promotions",
        icon: promotions,
    },
    {
        id: 6,
        name: "Users",
        match: "users",
        icon: users,
    },
]
const ProductTableTest = [
    { id: 1, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 2, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 3, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 4, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 5, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 6, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 7, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 8, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 9, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 10, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 11, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 12, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 13, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 14, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 15, name: "test", brand: "test", stock: 40, price: 100 },
    { id: 16, name: "test", brand: "test", stock: 40, price: 100 },
];

const CategoriesTableTest = [
    { "id": 1, "name": "Electronics", "description": "Products related to electronic devices and accessories." },
    { "id": 2, "name": "Clothing", "description": "A variety of fashionable clothing items for all occasions." },
    { "id": 3, "name": "Home Appliances", "description": "Appliances for your home, making life easier and more convenient." },
    { "id": 4, "name": "Sports & Outdoors", "description": "Gear and equipment for various sports and outdoor activities." },
    { "id": 5, "name": "Books", "description": "A diverse collection of books for all ages and interests." },
    { "id": 6, "name": "Toys & Games", "description": "Fun and educational toys and games for children." },
    { "id": 7, "name": "Furniture", "description": "Quality furniture to enhance the comfort and aesthetics of your space." },
    { "id": 8, "name": "Beauty & Personal Care", "description": "Products to help you look and feel your best." },
    { "id": 9, "name": "Kitchen & Dining", "description": "Tools and accessories for your kitchen and dining needs." },
    { "id": 10, "name": "Automotive", "description": "Products for automotive maintenance and accessories." },
    { "id": 11, "name": "Health & Wellness", "description": "Items to support a healthy and balanced lifestyle." },
    { "id": 12, "name": "Pet Supplies", "description": "Everything you need to care for your furry friends." },
    { "id": 13, "name": "Garden & Outdoor Living", "description": "Supplies for gardening and outdoor relaxation." },
    { "id": 14, "name": "Music & Instruments", "description": "Instruments and accessories for music enthusiasts." },
    { "id": 15, "name": "Art & Craft", "description": "Materials for creative expression and artistic endeavors." },
    { "id": 16, "name": "Travel & Luggage", "description": "Essentials for travel and stylish luggage options." }
];
const pcStoreCategories = [
    { id: 1, name: 'Laptops' },
    { id: 2, name: 'Desktops' },
    { id: 3, name: 'Monitors' },
    { id: 4, name: 'Keyboards' },
    { id: 5, name: 'Mice' },
    { id: 6, name: 'Graphics Cards' },
    { id: 7, name: 'Storage' },
    { id: 8, name: 'Accessories' }
];

const ordersTableCategories = [
    {
        id:1,
        name: "CODE"
    },
    {
        id:2,
        name: "STATUS"
    },
    {
        id:3,
        name: "RECEIVE METHOD"
    },
    {
        id:4,
        name: "PAYMENT METHOD"
    },
    {
        id:5,
        name: "DATE"
    },
    {
        id:6,
        name: "CLIENT"
    },
    {
        id:7,
        name: "TOTAL"
    },
]

const orderTable = [
    {id: 1, code: 'A1B2C', status: true, receive_method: false, payment_method: true, date: '2023-12-11', client: 'Client1', total: 100, action: 'View'},
    {id: 2, code: 'D3E4F', status: false, receive_method: true, payment_method: false, date: '2023-12-11', client: 'Client2', total: 200, action: 'Edit'},
    {id: 3, code: 'G5H6I', status: true, receive_method: false, payment_method: true, date: '2023-12-11', client: 'Client3', total: 300, action: 'Delete'},
    {id: 4, code: 'J7K8L', status: false, receive_method: true, payment_method: false, date: '2023-12-11', client: 'Client4', total: 400, action: 'View'},
    {id: 5, code: 'M9N0O', status: true, receive_method: false, payment_method: true, date: '2023-12-11', client: 'Client5', total: 500, action: 'Edit'},
    {id: 6, code: 'P1Q2R', status: false, receive_method: true, payment_method: false, date: '2023-12-11', client: 'Client6', total: 600, action: 'Delete'},
    {id: 7, code: 'S3T4U', status: true, receive_method: false, payment_method: true, date: '2023-12-11', client: 'Client7', total: 700, action: 'View'},
    {id: 8, code: 'V5W6X', status: false, receive_method: true, payment_method: false, date: '2023-12-11', client: 'Client8', total: 800, action: 'Edit'},
    {id: 9, code: 'Y7Z8A', status: true, receive_method: false, payment_method: true, date: '2023-12-11', client: 'Client9', total: 900, action: 'Delete'},
    {id: 10, code: 'B9C0D', status: false, receive_method: true, payment_method: false, date: '2023-12-11', client: 'Client10', total: 1000, action: 'View'},
    {id: 11, code: 'E1F2G', status: true, receive_method: false, payment_method: true, date: '2023-12-11', client: 'Client11', total: 1100, action: 'Edit'},
    {id: 12, code: 'H3I4J', status: false, receive_method: true, payment_method: false, date: '2023-12-11', client: 'Client12', total: 1200, action: 'Delete'},
    {id: 13, code: 'K5L6M', status: true, receive_method: false, payment_method: true, date: '2023-12-11', client: 'Client13', total: 1300, action: 'View'},
    {id: 14, code: 'N7O8P', status: false, receive_method: true, payment_method: false, date: '2023-12-11', client: 'Client14', total: 1400, action: 'Edit'},
    {id: 15, code: 'Q9R0S', status: true, receive_method: false, payment_method: true, date: '2023-12-11', client: 'Client15', total: 1500, action: 'Delete'},
    {id: 16, code: 'T1U2V', status: false, receive_method: true, payment_method: false, date: '2023-12-11', client: 'Client16', total: 1600, action: 'View'}
];

export {
    manageCategories,
    ProductTableTest,
    CategoriesTableTest,
    pcStoreCategories,
    testImage,
    ordersTableCategories,
    orderTable
}
