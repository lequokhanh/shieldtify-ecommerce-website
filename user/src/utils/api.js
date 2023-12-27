import axios from 'axios'
import validator from 'validator'

axios.defaults.baseURL = 'http://localhost:3000/api'
// axios.interceptors.response.use(
//     (res) => {
//     if (res.status === 200) {
//         return res.data;
//     }
//     return res;
//     },
//     (error) => {
//         return error;
//     }
// );

const axiosCookie = axios.create({
    withCredentials: true,
})

export async function sendEmail({ email }) {
    const params = new URLSearchParams()
    params.append('email', email)
    return await axios.get('/auth/send-email-register', { params })
}

export function checkExistedEmail({ email }) {
    const params = new URLSearchParams()
    params.append('email', email)
    return axios.get('/auth/existed-email', { params })
}

export function register({ Username, Password, Displayname, token }) {
    return axios.post(`/auth/register?token=${token}`, {
        username: Username,
        password: Password,
        displayname: Displayname,
    })
}
export function checkToken(token, used_to) {
    return axios.get(`/auth/check-token?token=${token}&used_to=${used_to}`)
}

export function login({ loginCred, password }) {
    if (validator.isEmail(loginCred)) {
        return axiosCookie.post('/auth/login/client', {
            email: loginCred,
            password,
        })
    }
    return axiosCookie.post('/auth/login/client', {
        username: loginCred,
        password,
    })
}

export function getUser() {
    return axiosCookie.get('/user/me')
}

export function logout() {
    return axiosCookie.post('/auth/logout')
}

export function sendEmailResetPassword(email) {
    return axios.get(`/auth/send-email-reset-password?email=${email}`)
}

export function resetPassword(token, password) {
    return axios.post(`/auth/reset-password?token=${token}`, {
        password: password,
    })
}

export function getProduct(id) {
    return axios.get(`/product/${id}`)
}

export function getAllProductByCategoryOrKeyword({
    category = '',
    priceRange = '',
    brands = '',
    page = 1,
    sortBy = 'popular',
    keyword,
}) {
    let url
    if (sortBy === null || sortBy === undefined || sortBy === 'Most popular') {
        sortBy = 'popular'
    }
    if (sortBy === 'Price (Desc)') {
        sortBy = 'price-desc'
    }
    if (sortBy === 'Price (Asc)') {
        sortBy = 'price-asc'
    }
    if (sortBy === 'Name (A-Z)') {
        sortBy = 'name-asc'
    }
    if (sortBy === 'Name (Z-A)') {
        sortBy = 'name-desc'
    }
    if (page === null || page === undefined) {
        page = 1
    }
    if (keyword !== undefined && keyword !== null) {
        url = `/product/?keyword=${keyword}&page=${page}&sort=${sortBy}`
    } else {
        url = `/product/category/${category}?page=${page}&sort=${sortBy}`
    }
    if (priceRange !== null) {
        url += `&priceRange=${priceRange}`
    }
    if (brands !== null && brands !== undefined && brands !== '') {
        var decodedString = decodeURIComponent(brands)
        url += `&brands=${decodedString}`
    }
    return axios.get(url)
}

export function getAllProductByCategoryOrKeywordBuilder({
    category = '',
    priceRange = '',
    brands = '',
    page = 1,
    sortBy = 'popular',
    keyword,
}) {
    let url
    if (category === 'CPU Cooler') {
        category = 'CPUCOOLER'
    } else if (category === 'Video Card') {
        category = 'GPU'
    } else if (category === 'Power Supply') {
        category = 'PSU'
    }
    if (sortBy === null || sortBy === undefined || sortBy === 'Most popular') {
        sortBy = 'popular'
    }
    if (sortBy === 'Price (Desc)') {
        sortBy = 'price-desc'
    }
    if (sortBy === 'Price (Asc)') {
        sortBy = 'price-asc'
    }
    if (sortBy === 'Name (A-Z)') {
        sortBy = 'name-asc'
    }
    if (sortBy === 'Name (Z-A)') {
        sortBy = 'name-desc'
    }
    if (page === null || page === undefined) {
        page = 1
    }
    if (keyword !== undefined && keyword !== null && keyword !== '') {
        url = `/product/category/${category}?keyword=${keyword}&page=${page}&sort=${sortBy}`
    } else {
        url = `/product/category/${category}?page=${page}&sort=${sortBy}`
    }
    if (priceRange !== null) {
        url += `&priceRange=${priceRange[0]}-${priceRange[1]}`
    }
    if (brands !== null && brands !== undefined && brands !== '') {
        var decodedString = decodeURIComponent(brands)
        url += `&brands=${decodedString}`
    }
    return axios.get(url)
}

export function getUserCart() {
    return axiosCookie.get('/cart')
}

export function addToCart({ item, addType}) {
    if(addType === 'single'){
        return axiosCookie.post('/cart', {
            items: [
                {
                    item: item.uid,
                    quantity: 1,
                },
            ],
        })
    }else if(addType=="multiple"){
        return axiosCookie.post('/cart', {
            items : item
        })
    }
}


export function updateCart({ item, quantity }) {
    return axiosCookie.put('/cart', {
        item,
        quantity,
    })
}

export function removeAllItemsFromCart() {
    return axiosCookie.delete(`/cart`)
}

export function applyDiscountCode(code) {
    return axiosCookie.get(`/cart/discount?code=${code}`)
}

export function getAddresses() {
    return axiosCookie.get(`/user/address`)
}
export function createAddress(add) {
    console.log(add)
    return axiosCookie.post(`/user/address`, {
        address: add.address,
        city: add.city,
        province: add.province,
        phone_number: add.phone_number,
        is_default: add.is_default,
    })
}

export function checkOut({
    code,
    payment_method,
    receive_method,
    shipping_addressid,
}) {
    if (!code) {
        return axiosCookie.post(`/cart/checkout`, {
            payment_method,
            receive_method,
            shipping_addressid,
        })
    }
    return axiosCookie.post(`/cart/checkout`, {
        code,
        payment_method,
        receive_method,
        shipping_addressid,
    })
}

export function updateAddress(add) {
    return axiosCookie.put(`/user/address/${add.uid}`, {
        address: add.address,
        city: add.city,
        province: add.province,
        phone_number: add.phone_number,
        is_default: add.is_default,
    })
}

export function deleteAddress(addID) {
    return axiosCookie.delete(`/user/address/${addID}`)
}

export function updateProfile(profile) {
    return axiosCookie.put('/user/profile/client', {
        display_name: profile.display_name,
        username: profile.username,
    })
}

export function getOrders() {
    return axiosCookie.get('/user/order/client')
}

export function getOrderByID(id) {
    return axiosCookie.get(`/user/order/client/${id}`)
}

export function updatePassword({ old_password, new_password }) {
    return axiosCookie.put('/user/staff/update-password', {
        old_password,
        new_password,
    })
}

export function sendMessage({message}) {
    return
}