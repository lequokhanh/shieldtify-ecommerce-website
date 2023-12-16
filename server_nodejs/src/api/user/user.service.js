const db = require('../../models');
const { AppError } = require('../../common/errors/AppError');
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
module.exports = {
    getAddresses: async (uid) => {
        try {
            const addresses = await db.client_address.findAll({
                where: {
                    clientid: uid,
                },
            });
            return {
                statusCode: 200,
                message: 'Get addresses successfully',
                data: addresses,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    createAddress: async (
        clientid,
        { address, city, province, phone_number, is_default },
    ) => {
        try {
            const allAddress = await db.client_address.findAll({
                where: {
                    clientid,
                },
            });
            const newAddress = await db.client_address.create({
                uid: v4(),
                clientid,
                address,
                city,
                province,
                phone_number,
                is_default: allAddress.length === 0 ? true : is_default,
            });
            if (allAddress.length !== 0 && is_default) {
                await db.client_address.update(
                    {
                        is_default: false,
                    },
                    {
                        where: {
                            clientid,
                            uid: {
                                [db.Sequelize.Op.not]: newAddress.uid,
                            },
                        },
                    },
                );
            }
            return {
                statusCode: 200,
                message: 'Create address successfully',
                data: newAddress,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    getClients: async (page = 1, keyword = '') => {
        try {
            const limit = 10;
            const offset = (page - 1) * limit;
            const clients = await db.client_account.findAndCountAll({
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            username: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            email: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            display_name: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                    ],
                },
                attributes: ['uid', 'display_name', 'username', 'email'],
                limit,
                offset,
            });
            return {
                statusCode: 200,
                message: 'Get clients successfully',
                data: clients,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    getClientById: async (uid) => {
        try {
            const client = await db.client_account.findOne({
                where: {
                    uid,
                },
                attributes: ['uid', 'display_name', 'username', 'email'],
                include: [
                    {
                        model: db.client_address,
                        as: 'addresses',
                    },
                ],
            });
            return {
                statusCode: 200,
                message: 'Get client successfully',
                data: client,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    updateClient: async (uid, { display_name, username }) => {
        try {
            const client = await db.client_account.findOne({
                where: {
                    uid,
                },
            });
            if (!client) {
                throw new AppError(404, 'Client not found');
            }
            if (display_name) {
                client.display_name = display_name;
            }
            if (username) {
                const checkUsername = await db.client_account.findOne({
                    where: {
                        username,
                        uid: {
                            [db.Sequelize.Op.not]: uid,
                        },
                    },
                });
                if (checkUsername) {
                    throw new AppError(400, 'Username is already taken');
                }
                client.username = username;
            }
            await client.save();
            delete client.dataValues.password;
            delete client.dataValues.changed_password_at;
            delete client.dataValues.createdAt;
            delete client.dataValues.updatedAt;
            return {
                statusCode: 200,
                message: 'Update client successfully',
                data: client,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    updateAddress: async (
        clientid,
        uid,
        { address, city, province, phone_number, is_default },
    ) => {
        try {
            const allAddress = await db.client_address.findAll({
                where: {
                    clientid,
                },
            });
            const updateAddress = await db.client_address.findOne({
                where: {
                    uid,
                    clientid,
                },
            });
            if (!updateAddress) {
                throw new AppError(404, 'Address not found');
            }
            if (updateAddress.clientid !== clientid) {
                throw new AppError(400, 'Address not belong to this client');
            }
            if (!is_default && updateAddress.is_default) {
                throw new AppError(
                    400,
                    'You cannot set this address to not default, please set another address to default first',
                );
            }
            updateAddress.address = address;
            updateAddress.city = city;
            updateAddress.province = province;
            updateAddress.phone_number = phone_number;
            if (allAddress.length !== 0 && is_default) {
                await db.client_address.update(
                    {
                        is_default: false,
                    },
                    {
                        where: {
                            clientid,
                            uid: {
                                [db.Sequelize.Op.not]: updateAddress.uid,
                            },
                        },
                    },
                );
            }

            updateAddress.is_default = is_default;
            await updateAddress.save();
            return {
                statusCode: 200,
                message: 'Update address successfully',
                data: updateAddress,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    deleteAddress: async (clientid, uid) => {
        try {
            const address = await db.client_address.findOne({
                where: {
                    uid,
                    clientid,
                },
            });
            if (!address) {
                throw new AppError(404, 'Address not found');
            }
            if (address.clientid !== clientid) {
                throw new AppError(400, 'Address not belong to this client');
            }
            if (address.is_default)
                throw new AppError(
                    400,
                    'You cannot delete default address, please set another address to default first',
                );
            await address.destroy();
            return {
                statusCode: 200,
                message: 'Delete address successfully',
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    getAccounts: async (page = 1, keyword = '') => {
        try {
            const limit = 10;
            const offset = (page - 1) * limit;
            const accounts = await db.account.findAndCountAll({
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            username: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            display_name: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            role: {
                                [db.Sequelize.Op.like]: `%${keyword}%`,
                            },
                        },
                    ],
                },
                attributes: ['uid', 'username', 'display_name', 'role'],
                limit,
                offset,
            });
            return {
                statusCode: 200,
                message: 'Get accounts successfully',
                data: accounts,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    updateAccount: async (userRole, uid, { username, display_name, role }) => {
        try {
            const account = await db.account.findOne({
                where: {
                    uid,
                },
            });
            if (!account) {
                throw new AppError(404, 'Account not found');
            }
            if (
                (account.dataValues.role === 'admin' &&
                    userRole !== 'superadmin') ||
                account.dataValues.role === 'superadmin'
            ) {
                throw new AppError(
                    403,
                    'You are not allowed to update this account',
                );
            }
            if (username) {
                const checkUsername = await db.account.findOne({
                    where: {
                        username,
                    },
                });
                if (checkUsername) {
                    throw new AppError(400, 'Username is already taken');
                }
                account.username = username;
            }
            if (display_name) {
                account.display_name = display_name;
            }
            if (role) {
                account.role = role;
            }
            await account.save();
            return {
                statusCode: 200,
                message: 'Update account successfully',
                data: account,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    resetPassword: async (userRole, uid) => {
        try {
            const account = await db.account.findOne({
                where: {
                    uid,
                },
            });
            if (!account) {
                throw new AppError(404, 'Account not found');
            }
            if (
                (account.role === 'admin' && userRole !== 'superadmin') ||
                account.role === 'superadmin'
            ) {
                throw new AppError(
                    403,
                    'You are not allowed to update this account',
                );
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('123456', salt);
            account.password = hashedPassword;
            await account.save();
            return {
                statusCode: 200,
                message: 'Reset password successfully',
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    getAllOrders: async (page = 1, keyword = '') => {
        try {
            const limit = 10;
            const offset = (page - 1) * limit;
            const orders = await db.sequelize.query(
                `
                SELECT od.uid, od.clientid, od.payment_method, od.receive_method,  od.order_date, od.order_status, ca.display_name, round(sum(oi.new_price * oi.quantity), 2) as total
                FROM orders od
                    LEFT JOIN client_accounts ca ON od.clientid = ca.uid
                    LEFT JOIN order_items oi ON od.uid = oi.orderid
                WHERE od.order_status LIKE '%${keyword}%' OR ca.display_name LIKE '%${keyword}%' OR od.uid LIKE '%${keyword}%' OR od.payment_method LIKE '%${keyword}%' OR od.receive_method LIKE '%${keyword}%' OR od.order_date LIKE '%${keyword}%'
                GROUP BY od.uid
                LIMIT ${limit} OFFSET ${offset}`,
                {
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );
            const count = await db.sequelize.query(
                `
                SELECT order_status, COUNT(distinct orders.uid) as count, ROUND(SUM(oi.new_price * oi.quantity),2) as total
                FROM orders
                    LEFT JOIN order_items oi ON orders.uid = oi.orderid
                GROUP BY order_status`,
                {
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );
            return {
                statusCode: 200,
                message: 'Get orders successfully',
                data: {
                    orders,
                    count,
                },
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    getOrderByClientID: async (clientid) => {
        try {
            const orders = await db.sequelize.query(
                `
                SELECT od.uid, od.clientid, od.payment_method, od.receive_method, od.order_date, od.order_status, ROUND(SUM(oi.new_price * oi.quantity),2) as total
                FROM orders od
                    LEFT JOIN order_items oi ON od.uid = oi.orderid
                WHERE od.clientid = '${clientid}'
                GROUP BY od.uid`,
                {
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );
            return {
                statusCode: 200,
                message: 'Get orders successfully',
                data: orders,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    getOrderByID: async (uid, clientid) => {
        try {
            const order = await db.order.findOne({
                where: {
                    uid,
                    clientid,
                },
                attributes: [
                    'uid',
                    'clientid',
                    'payment_method',
                    'receive_method',
                    'order_date',
                    'order_status',
                    'promotion_code',
                ],
                include: [
                    {
                        model: db.account,
                        as: 'staff',
                        attributes: ['display_name'],
                    },
                    {
                        model: db.client_account,
                        as: 'client',
                        attributes: ['display_name'],
                    },
                    {
                        model: db.client_address,
                        as: 'shipping_address',
                    },
                    {
                        model: db.order_item,
                        as: 'order_item',
                        attributes: [
                            'itemid',
                            'quantity',
                            'old_price',
                            'new_price',
                        ],
                        include: [
                            {
                                model: db.item,
                                as: 'item',
                                attributes: ['name'],
                            },
                        ],
                    },
                ],
            });
            if (!order) {
                throw new AppError(404, 'Order not found');
            }
            let old_total = 0;
            let new_total = 0;
            for (item of order.dataValues.order_item) {
                old_total +=
                    item.dataValues.old_price * item.dataValues.quantity;
                new_total +=
                    item.dataValues.new_price * item.dataValues.quantity;
            }
            order.dataValues.old_total = parseFloat(old_total.toFixed(2));
            order.dataValues.new_total = parseFloat(new_total.toFixed(2));
            return {
                statusCode: 200,
                message: 'Get order successfully',
                data: order,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    createStaff: async (userRole, { username, display_name, role }) => {
        try {
            const checkUsername = await db.account.findOne({
                where: {
                    username,
                },
            });
            if (checkUsername) {
                throw new AppError(400, 'Username is already taken');
            }
            if (role != 'admin' && role != 'staff') {
                throw new AppError(400, 'Role is invalid');
            }
            if (userRole !== 'superadmin' && role === 'admin') {
                throw new AppError(
                    403,
                    'You are not allowed to create admin account',
                );
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('123456', salt);
            const newAccount = await db.account.create({
                uid: v4(),
                username,
                password: hashedPassword,
                display_name,
                role,
            });
            return {
                statusCode: 200,
                message: 'Create staff successfully',
                data: newAccount,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    getOrdersByStatus: async (page = 1, keyword = '', status) => {
        try {
            const limit = 10;
            const offset = (page - 1) * limit;
            const orders = await db.sequelize.query(
                `
                SELECT od.uid, od.clientid, od.payment_method, od.receive_method,  od.order_date, od.order_status, ca.display_name, round(sum(oi.new_price * oi.quantity), 2) as total
                FROM orders od
                    LEFT JOIN client_accounts ca ON od.clientid = ca.uid
                    LEFT JOIN order_items oi ON od.uid = oi.orderid
                WHERE od.order_status LIKE '%${keyword}%' AND LOWER(od.order_status) = LOWER('${status}')
                GROUP BY od.uid
                LIMIT ${limit} OFFSET ${offset}`,
                {
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );
            const count = await db.sequelize.query(
                `
                SELECT order_status, COUNT(distinct orders.uid) as count, ROUND(SUM(oi.new_price * oi.quantity),2) as total
                FROM orders
                    LEFT JOIN order_items oi ON orders.uid = oi.orderid
                WHERE order_status = '${status}'
                GROUP BY order_status`,
                {
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );
            return {
                statusCode: 200,
                message: 'Get orders successfully',
                data: {
                    orders,
                    count,
                },
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
};
