using shieldtify.common;
using shieldtify.models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using BC = BCrypt.Net.BCrypt;
namespace shieldtify.api.user
{
    public static class UserService
    {
        public static APIRes getAddresses(string clientid)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var addresses = db.ClientAddresses.Where(x => x.Clientid.ToString() == clientid).Select(x => new
                {
                    uid = x.Uid,
                    address = x.Address,
                    city = x.City,
                    province = x.Province,
                    phone_number = x.PhoneNumber,
                    is_default = x.IsDefault,
                }).ToList();
                return new APIRes(200, "Get addresses successfully", addresses);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes createAddress(string clientid, CreateAddressBody body)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var allAddress = db.ClientAddresses.Where(x => x.Clientid.ToString() == clientid).ToList();
                var newAddress = new ClientAddress
                {
                    Uid = Guid.NewGuid(),
                    Clientid = Guid.Parse(clientid),
                    Address = body.address,
                    City = body.city,
                    Province = body.province,
                    PhoneNumber = body.phone_number,
                    IsDefault = allAddress.Count == 0 ? true : body.is_default,
                };
                db.ClientAddresses.Add(newAddress);
                db.SaveChanges();
                if (allAddress.Count != 0 && body.is_default)
                {
                    db.ClientAddresses.Where(x => x.Clientid.ToString() == clientid && x.Uid != newAddress.Uid).ToList().ForEach(x => x.IsDefault = false);
                    db.SaveChanges();
                }
                return new APIRes(200, "Create address successfully", newAddress);
            }
            catch (Exception)
            {
                throw;
            }
        }
        /*    getClients: async (page = 1, keyword = '') => {
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
    getOrderByID: async (uid) => {
        try {
            //calculate total price with old price and new price
            const order = await db.order.findOne({
                where: {
                    uid,
                },
                attributes: [
                    'uid',
                    'clientid',
                    'payment_method',
                    'receive_method',
                    'order_date',
                    'order_status',
                ],
                include: [
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
    },*/
        public static APIRes getClients(int page = 1, string keyword = "")
        {
            try
            {
                using var db = new ShieldtifyContext();
                var limit = 10;
                var offset = (page - 1) * limit;
                var clients = db.ClientAccounts.Where(x => x.Username.Contains(keyword) || x.Email.Contains(keyword) || x.DisplayName.Contains(keyword)).Select(x => new
                {
                    uid = x.Uid,
                    display_name = x.DisplayName,
                    username = x.Username,
                    email = x.Email,
                }).Skip(offset).Take(limit).ToList();
                return new APIRes(200, "Get clients successfully", new
                {
                    clients,
                    count = db.ClientAccounts.Count(),
                });
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes getClientById(string uid)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var client = db.ClientAccounts.Where(x => x.Uid.ToString() == uid).Select(x => new
                {
                    uid = x.Uid,
                    display_name = x.DisplayName,
                    username = x.Username,
                    email = x.Email,
                    addresses = x.ClientAddresses.Select(x => new
                    {
                        uid = x.Uid,
                        address = x.Address,
                        city = x.City,
                        province = x.Province,
                        phone_number = x.PhoneNumber,
                        is_default = x.IsDefault,
                    }).ToList(),
                }).FirstOrDefault();
                return new APIRes(200, "Get client successfully", client);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes updateClient(string uid, UpdateClientBody body)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var client = db.ClientAccounts.Where(x => x.Uid.ToString() == uid).FirstOrDefault();
                if (client == null)
                {
                    return new APIRes(404, "Client not found");
                }
                if (body.display_name != null)
                {
                    client.DisplayName = body.display_name;
                }
                if (body.username != null)
                {
                    var checkUsername = db.ClientAccounts.Where(x => x.Username == body.username && x.Uid != client.Uid).FirstOrDefault();
                    if (checkUsername != null)
                    {
                        return new APIRes(400, "Username is already taken");
                    }
                    client.Username = body.username;
                }
                db.SaveChanges();
                return new APIRes(200, "Update client successfully", client);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes updateAddress(string clientid, string uid, CreateAddressBody body)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var allAddress = db.ClientAddresses.Where(x => x.Clientid.ToString() == clientid).ToList();
                var updateAddress = db.ClientAddresses.Where(x => x.Uid.ToString() == uid && x.Clientid.ToString() == clientid).FirstOrDefault();
                if (updateAddress == null)
                {
                    return new APIRes(404, "Address not found");
                }
                if (updateAddress.Clientid.ToString() != clientid)
                {
                    return new APIRes(400, "Address not belong to this client");
                }
                if (!body.is_default && updateAddress.IsDefault)
                {
                    return new APIRes(400, "You cannot set this address to not default, please set another address to default first");
                }
                updateAddress.Address = body.address;
                updateAddress.City = body.city;
                updateAddress.Province = body.province;
                updateAddress.PhoneNumber = body.phone_number;
                if (allAddress.Count != 0 && body.is_default)
                {
                    db.ClientAddresses.Where(x => x.Clientid.ToString() == clientid && x.Uid != updateAddress.Uid).ToList().ForEach(x => x.IsDefault = false);
                }
                updateAddress.IsDefault = body.is_default;
                db.SaveChanges();
                return new APIRes(200, "Update address successfully", updateAddress);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes deleteAddress(string clientid, string uid)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var address = db.ClientAddresses.Where(x => x.Uid.ToString() == uid && x.Clientid.ToString() == clientid).FirstOrDefault();
                if (address == null)
                {
                    return new APIRes(404, "Address not found");
                }
                if (address.Clientid.ToString() != clientid)
                {
                    return new APIRes(400, "Address not belong to this client");
                }
                if (address.IsDefault)
                {
                    return new APIRes(400, "You cannot delete default address, please set another address to default first");
                }
                db.ClientAddresses.Remove(address);
                db.SaveChanges();
                return new APIRes(200, "Delete address successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes getAccounts(int page = 1, string keyword = "")
        {
            try
            {
                using var db = new ShieldtifyContext();
                var limit = 10;
                var offset = (page - 1) * limit;
                var accounts = db.Accounts.Where(x => x.Username.Contains(keyword) || x.DisplayName.Contains(keyword) || x.Role.Contains(keyword)).Select(x => new
                {
                    uid = x.Uid,
                    username = x.Username,
                    display_name = x.DisplayName,
                    role = x.Role,
                }).Skip(offset).Take(limit).ToList();
                return new APIRes(200, "Get accounts successfully", new
                {
                    accounts,
                    count = db.Accounts.Count(),
                });
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes updateAccount(string userRole, string uid, UpdateAccountBody body)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var account = db.Accounts.Where(x => x.Uid.ToString() == uid).FirstOrDefault();
                if (account == null)
                {
                    return new APIRes(404, "Account not found");
                }
                if ((account.Role == "admin" && userRole != "superadmin") || account.Role == "superadmin")
                {
                    return new APIRes(403, "You are not allowed to update this account");
                }
                if (body.username != null)
                {
                    var checkUsername = db.Accounts.Where(x => x.Username == body.username).FirstOrDefault();
                    if (checkUsername != null)
                    {
                        return new APIRes(400, "Username is already taken");
                    }
                    account.Username = body.username;
                }
                if (body.display_name != null)
                {
                    account.DisplayName = body.display_name;
                }
                if (body.role != null)
                {
                    account.Role = body.role;
                }
                db.SaveChanges();
                return new APIRes(200, "Update account successfully", account);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes resetPassword(string userRole, string uid)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var account = db.Accounts.Where(x => x.Uid.ToString() == uid).FirstOrDefault();
                if (account == null)
                {
                    return new APIRes(404, "Account not found");
                }
                if ((account.Role == "admin" && userRole != "superadmin") || account.Role == "superadmin")
                {
                    return new APIRes(403, "You are not allowed to update this account");
                }
                var salt = BC.GenerateSalt();
                var hashed = BC.HashPassword("123456", salt);
                account.Password = "123456";
                db.SaveChanges();
                return new APIRes(200, "Reset password successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes getAllOrders(int page = 1, string keyword = "")
        {
            try
            {
                using var db = new ShieldtifyContext();
                var limit = 10;
                var offset = (page - 1) * limit;
                var orders = db.Orders.Where(x => x.OrderStatus.Contains(keyword) || x.Uid.ToString().Contains(keyword) || x.PaymentMethod.Contains(keyword) || x.ReceiveMethod.Contains(keyword) || x.OrderDate.ToString().Contains(keyword)).Select(x => new
                {
                    uid = x.Uid,
                    clientid = x.Clientid,
                    payment_method = x.PaymentMethod,
                    receive_method = x.ReceiveMethod,
                    order_date = x.OrderDate,
                    order_status = x.OrderStatus,
                    display_name = x.Client.DisplayName,
                    total = Math.Round(x.OrderItems.Sum(x => x.NewPrice * x.Quantity), 2),
                }).Skip(offset).Take(limit).ToList();
                var count = db.Orders.GroupBy(x => x.OrderStatus).Select(x => new
                {
                    order_status = x.Key,
                    count = x.Count(),
                    total = Math.Round(x.Sum(x => x.OrderItems.Sum(x => x.NewPrice * x.Quantity)), 2),
                }).ToList();
                return new APIRes(200, "Get orders successfully", new
                {
                    orders,
                    count,
                });
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes getOrderByClientID(string clientid)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var orders = db.Orders.Where(x => x.Clientid.ToString() == clientid).Select(x => new
                {
                    uid = x.Uid,
                    clientid = x.Clientid,
                    payment_method = x.PaymentMethod,
                    receive_method = x.ReceiveMethod,
                    order_date = x.OrderDate,
                    order_status = x.OrderStatus,
                    total = Math.Round(x.OrderItems.Sum(x => x.NewPrice * x.Quantity), 2),
                }).ToList();
                return new APIRes(200, "Get orders successfully", orders);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes getOrderByID(string uid, string clientid)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var order = db.Orders.Where(x => x.Uid.ToString() == uid && x.Clientid.ToString() == clientid).Select(x => new
                {
                    uid = x.Uid,
                    clientid = x.Clientid,
                    payment_method = x.PaymentMethod,
                    receive_method = x.ReceiveMethod,
                    order_date = x.OrderDate,
                    order_status = x.OrderStatus,
                    old_total = Math.Round(x.OrderItems.Sum(x => x.OldPrice * x.Quantity), 2),
                    new_total = Math.Round(x.OrderItems.Sum(x => x.NewPrice * x.Quantity), 2),
                    client = new
                    {
                        display_name = x.Client.DisplayName,
                    },
                    shipping_address = new
                    {
                        address = x.ShippingAddress.Address,
                        city = x.ShippingAddress.City,
                        province = x.ShippingAddress.Province,
                        phone_number = x.ShippingAddress.PhoneNumber,
                    },
                    order_item = x.OrderItems.Select(x => new
                    {
                        itemid = x.Itemid,
                        quantity = x.Quantity,
                        old_price = x.OldPrice,
                        new_price = x.NewPrice,
                        item = new
                        {
                            name = x.Item.Name,
                        },
                    }).ToList(),
                }).FirstOrDefault();
                return new APIRes(200, "Get order successfully", order);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}