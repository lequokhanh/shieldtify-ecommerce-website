import axios from "axios";
import validator from "validator";

axios.defaults.baseURL = "https://n6mptpfb-3000.asse.devtunnels.ms/api";

axios.interceptors.response.use(
	(res) => {
		if (res.status === 200) {
			return res.data;
		}
		return res;
	},
	(error) => {
		return error;
	}
);

const axiosCookie = axios.create({
	withCredentials: true,
});

export function getALlCategories() {
	return axios.get("/product/category");
}

export function getAllProductByCategory({
	category = "",
	page = 1,
	brands,
	searchValue,
}) {
	let url;
	if (page === null || page === undefined) {
		page = 1;
	}
	url = `/product/category/${category}?keyword=${searchValue}&page=${page}`;
	if (searchValue === "getTotalProducts") {
		url = `/product/?keyword=&page=${page}`;
	}
	if (
		brands !== null &&
		brands !== undefined &&
		brands !== "" &&
		brands.length > 0
	) {
		const brandsString = brands.length > 1 ? brands.join(",") : brands[0];
		url = `${url}&brands=${brandsString}`;
	}
	return axios.get(url);
}

export function getProduct(id) {
	return axios.get(`/product/${id}`);
}

export function login({ loginCred, password }) {
	if (validator.isEmail(loginCred)) {
		return axiosCookie.post("/auth/login/admin", {
			email: loginCred,
			password,
		});
	}
	return axiosCookie.post("/auth/login/admin", {
		username: loginCred,
		password,
	});
}

export function getUser() {
	return axiosCookie.get("/user/me");
}

export function logout() {
	return axiosCookie.post("/auth/logout");
}

export function updateProduct({
	productID,
	categoryid,
	stock_qty,
	name,
	brandid,
	price,
	specification,
	description,
}) {
	return axiosCookie.put(`/product/${productID}`, {
		categoryid,
		brandid,
		name,
		specification,
		description,
		price,
		stock_qty,
	});
}
export function updateProductForStaff({
	productID,
	categoryid,
	stock_qty,
	name,
	brandid,
	price,
	specification,
	description,
}) {
	return axiosCookie.put(`/product/staff/${productID}`, {
		categoryid,
		brandid,
		name,
		specification,
		description,
		price,
		stock_qty,
	});
}
export function getALlBrands() {
	return axiosCookie.get("/product/brand");
}

export function createBrand({ name }) {
	return axiosCookie.post("/product/brand", {
		name,
	});
}

export function addImagesToProduct({ productID, imgs }) {
	return axiosCookie.post(`/product/image/${productID}`, {
		imgs,
	});
}

export function setPrimaryImage({ productID, imgid }) {
	return axiosCookie.put(
		`/product/image/default/${productID}?imgid=${imgid}`
	);
}

export function createNewProduct({
	categoryid,
	stock_qty,
	name,
	brandid,
	price,
	specification,
	description,
}) {
	return axiosCookie.post("/product", {
		categoryid,
		brandid,
		name,
		specification,
		description,
		price,
		stock_qty,
	});
}

export function deleteImageFromProduct({ productID, imgid }) {
	return axiosCookie.delete(`/product/image/${productID}?imgid=${imgid}`);
}

export function getOrders() {
	return axiosCookie.get("/user/order/client");
}

export function getOrderByID(id) {
	return axiosCookie.get(`/user/order/client/${id}`);
}

export function updateAddress({ add, userID }) {
	return axiosCookie.put(
		`/user/address/admin/${userID}?addressId=${add.uid}`,
		{
			address: add.address,
			city: add.city,
			province: add.province,
			phone_number: add.phone_number,
			is_default: add.is_default,
		}
	);
}

export function deleteAddress({ addID, userID }) {
	return axiosCookie.delete(
		`/user/address/admin/${userID}?addressId=${addID}`
	);
}

export function updateProfile(profile) {
	return axiosCookie.put("/user/profile/client", {
		display_name: profile.display_name,
		username: profile.username,
	});
}

export function getAddresses() {
	return axiosCookie.get(`/user/address`);
}

export function createAddress(add) {
	console.log(add);
	return axiosCookie.post(`/user/address`, {
		address: add.address,
		city: add.city,
		province: add.province,
		phone_number: add.phone_number,
		is_default: add.is_default,
	});
}

export function getUserById({ id }) {
	return axiosCookie.get(`/user/client/admin/${id}`);
}

export function getAllClients({ page = 1, keyword = "" }) {
	return axiosCookie.get(
		`/user/client/admin?page=${page}&keyword=${keyword}`
	);
}

export function getAllStaffs({ page = 1, keyword = "" }) {
	return axiosCookie.get(`/user/staff?page=${page}&keyword=${keyword}`);
}

export function updateProfileClient({ displayName, username, uid }) {
	return axiosCookie.put(`/user/client/admin/${uid}`, {
		display_name: displayName,
		username: username,
	});
}

export function resetStaffPassword({ uid }) {
	return axiosCookie.put(`/user/staff/${uid}/reset-password`);
}

export function getAllOrders({ page = 1, keyword = "" }) {
	return axiosCookie.get(`/user/order/admin?page=${page}&keyword=${keyword}`);
}

export function getOrderByClientId({ userId, orderId }) {
	return axiosCookie.get(`/user/order/admin/${userId}?orderId=${orderId}`);
}

export function createCategory({ name, description }) {
	return axiosCookie.post(`/product/category`, {
		name,
		description,
	});
}

export function updateCategory({ name, description, uid }) {
	return axiosCookie.put(`/product/category/${uid}`, {
		name,
		description,
	});
}

export function updateStaffAcount({ id, username, display_name, role }) {
	if (!username && !display_name) {
		return axiosCookie.put(`/user/staff/${id}`, {
			role,
		});
	} else if (!username) {
		return axiosCookie.put(`/user/staff/${id}`, {
			display_name,
			role,
		});
	} else if (!display_name) {
		return axiosCookie.put(`/user/staff/${id}`, {
			username,
			role,
		});
	}
	return axiosCookie.put(`/user/staff/${id}`, {
		username,
		display_name,
		role,
	});
}

export function createStaffAccount({ username, role, display_name }) {
	return axiosCookie.post(`/user/staff`, {
		username,
		display_name,
		role,
	});
}

export function processOrders({ checkedOrdersIds, type }) {
	console.log(checkedOrdersIds);
	return axiosCookie.put(`user/order/admin/process?type=${type}`, [
		...checkedOrdersIds,
	]);
}

export function getOrderByStatus({ status, page, keyword }) {
	return axiosCookie.get(
		`/user/order/admin/status?status=${status}&page=${page}&keyword=${keyword}`
	);
}

export function updateOrder({ orderId, newOrder }) {
	return axiosCookie.put(`/user/order/admin/${orderId}`, {
		...newOrder,
	});
}

export function updatePassword({ old_password, new_password }) {
	return axiosCookie.put("/user/staff/update-password", {
		old_password,
		new_password,
	});
}

export function sendMessage({ conversation_history, human_say }) {
	return axios.post("http://localhost:8000/chat", {
		conversation_history,
		human_say,
	});
}

export function generateLead(conversation_history) {
	return axios.post("http://localhost:8000/lead", {
		conversation_history,
	});
}

export function getAllConversation(userID) {
	return axiosCookie.get(`/user/chat/${userID}`);
}

export function getMessages(userID, conversationID) {
	return axiosCookie.get(
		`/user/message/${userID}?conversationId=${conversationID}`
	);
}

export function createConversation(messageList) {
	return axiosCookie.post(`/user/chat`, messageList);
}
