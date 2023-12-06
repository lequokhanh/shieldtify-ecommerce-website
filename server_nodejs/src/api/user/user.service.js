const db = require('../../models');
const { AppError } = require('../../common/errors/AppError');
const { v4 } = require('uuid');
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
            console.log(error);
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
        { uid, address, city, province, phone_number, is_default },
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
                            email: {
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
                attributes: ['uid', 'username', 'email', 'role'],
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
    updateAccount: async (userRole, uid, { username, email, role }) => {
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
            if (email) {
                const checkEmail = await db.account.findOne({
                    where: {
                        email,
                    },
                });
                if (checkEmail) {
                    throw new AppError(400, 'Email is already taken');
                }
                account.email = email;
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
            account.password = '123456';
            await account.save();
            return {
                statusCode: 200,
                message: 'Reset password successfully',
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
};
