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

        public static APIRes updateAccount(string userRole, string userID, string uid, UpdateAccountBody body)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var account = db.Accounts.Where(x => x.Uid.ToString() == uid).FirstOrDefault();
                if (account == null)
                {
                    return new APIRes(404, "Account not found");
                }
                if (uid != userID)
                {
                    if ((account.Role == "admin" && userRole != "superadmin") || account.Role == "superadmin")
                    {
                        return new APIRes(403, "You are not allowed to update this account");
                    }
                }
                if (body.role != null && body.role != "admin" && body.role != "staff")
                {
                    return new APIRes(400, "Role is not allowed to update");
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
                    promotion_code = x.PromotionCode,
                    staff = x.SupportedBy != null ? new
                    {
                        display_name = x.SupportedByNavigation.DisplayName,
                    } : null,
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
        public static APIRes createStaff(string userRole, CreateStaffBody body)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var checkUsername = db.Accounts.Where(x => x.Username == body.username).FirstOrDefault();
                if (checkUsername != null)
                {
                    return new APIRes(400, "Username is already taken");
                }
                if (body.role != "admin" && body.role != "staff")
                {
                    return new APIRes(400, "Role is invalid");
                }
                if (userRole != "superadmin" && body.role == "admin")
                {
                    return new APIRes(403, "You are not allowed to create admin account");
                }
                var salt = BC.GenerateSalt();
                var hashedPassword = BC.HashPassword("123456", salt);
                var newAccount = new Account
                {
                    Uid = Guid.NewGuid(),
                    Username = body.username,
                    Password = hashedPassword,
                    DisplayName = body.display_name,
                    Role = body.role,
                };
                db.Accounts.Add(newAccount);
                db.SaveChanges();
                return new APIRes(200, "Create staff successfully", newAccount);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes getOrdersByStatus(string status, int page = 1, string keyword = "")
        {
            try
            {
                using var db = new ShieldtifyContext();
                var limit = 10;
                var offset = (page - 1) * limit;
                var orders = db.Orders.Where(x => x.OrderStatus.Contains(keyword) && x.OrderStatus.ToLower() == status.ToLower()).Select(x => new
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
                var count = db.Orders.Where(x => x.OrderStatus == status).GroupBy(x => x.OrderStatus).Select(x => new
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
        public static APIRes updateOrder(string staffid, string uid, UpdateOrderBody body)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var order = db.Orders.Where(x => x.Uid.ToString() == uid).FirstOrDefault();
                if (order == null)
                {
                    return new APIRes(404, "Order not found");
                }
                if (body.order_status != null)
                {
                    if (order.OrderStatus == "Initiated" || order.OrderStatus == "Processing")
                    {
                        if (body.order_status == "Processing" || body.order_status == "Succeed" || body.order_status == "Canceled")
                        {
                            order.OrderStatus = body.order_status;
                        }
                    }
                    else if (order.OrderStatus == "Succeed" || order.OrderStatus == "Canceled")
                    {
                        return new APIRes(400, "Order is final state already");
                    }
                }
                if (body.shipping_addressid != null)
                {
                    var address = db.ClientAddresses.Where(x => x.Uid.ToString() == body.shipping_addressid).FirstOrDefault();
                    if (address == null)
                    {
                        return new APIRes(404, "Address not found");
                    }
                    order.ShippingAddressid = address.Uid;
                }
                var orderItems = new List<OrderItemBody>();
                if (body.products != null)
                {
                    foreach (var product in body.products)
                    {
                        var orderItem = db.OrderItems.Where(x => x.Orderid.ToString() == uid && x.Itemid.ToString() == product.itemid).FirstOrDefault();
                        if (orderItem == null)
                        {
                            return new APIRes(404, "Order item not found");
                        }
                        if (product.quantity != null)
                        {
                            if (product.quantity <= 0)
                            {
                                return new APIRes(400, "Quantity must be greater than 0");
                            }
                        }
                        if (product.new_price != null)
                        {
                            if (product.new_price <= 0)
                            {
                                return new APIRes(400, "New price must be greater than 0");
                            }
                        }
                        orderItems.Add(product);
                    }
                }
                foreach (var item in orderItems)
                {
                    var orderItem = db.OrderItems.Where(x => x.Orderid.ToString() == uid && x.Itemid.ToString() == item.itemid).FirstOrDefault();
                    orderItem.Quantity = item.quantity ?? orderItem.Quantity;
                    orderItem.NewPrice = item.new_price ?? orderItem.NewPrice;
                }
                order.ReceiveMethod = body.receive_method ?? order.ReceiveMethod;
                order.PaymentMethod = body.payment_method ?? order.PaymentMethod;
                order.SupportedBy = Guid.Parse(staffid);
                db.SaveChanges();
                return new APIRes(200, "Update order successfully", order);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public static APIRes processOrders(string staffid, List<UpdateOrderBody> orders, int type = 1)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var errors = new List<object>();
                if (type == 1)
                {
                    // Process order
                    foreach (var order in orders)
                    {
                        var orderToUpdate = db.Orders.Where(x => x.Uid.ToString() == order.uid).FirstOrDefault();
                        if (orderToUpdate == null)
                        {
                            return new APIRes(404, "Order not found");
                        }
                        if (orderToUpdate.OrderStatus == "Initiated")
                        {
                            orderToUpdate.OrderStatus = "Processing";
                        }
                        else if (orderToUpdate.OrderStatus == "Processing")
                        {
                            orderToUpdate.OrderStatus = "Succeed";
                        }
                        else if (orderToUpdate.OrderStatus == "Succeed" || orderToUpdate.OrderStatus == "Canceled")
                        {
                            errors.Add(new
                            {
                                uid = orderToUpdate.Uid,
                                message = "Order is final state already",
                            });
                        }
                        else
                        {
                            errors.Add(new
                            {
                                uid = orderToUpdate.Uid,
                                message = "Order is not in correct state",
                            });
                        }
                        orderToUpdate.SupportedBy = Guid.Parse(staffid);
                        db.SaveChanges();
                    }
                }
                else if (type == 0)
                {
                    // Cancel order
                    foreach (var order in orders)
                    {
                        var orderToUpdate = db.Orders.Where(x => x.Uid.ToString() == order.uid).FirstOrDefault();
                        if (orderToUpdate == null)
                        {
                            return new APIRes(404, "Order not found");
                        }
                        if (orderToUpdate.OrderStatus == "Initiated" || orderToUpdate.OrderStatus == "Processing")
                        {
                            orderToUpdate.OrderStatus = "Canceled";
                        }
                        else if (orderToUpdate.OrderStatus == "Succeed" || orderToUpdate.OrderStatus == "Canceled")
                        {
                            errors.Add(new
                            {
                                uid = orderToUpdate.Uid,
                                message = "Order is not in correct state",
                            });
                        }
                        else
                        {
                            errors.Add(new
                            {
                                uid = orderToUpdate.Uid,
                                message = "Order is final state already",
                            });
                        }
                        orderToUpdate.SupportedBy = Guid.Parse(staffid);
                        db.SaveChanges();
                    }
                }
                return new APIRes(200, type != 0 ? errors.Count == 0 ? "Process orders successfully" : "Process orders with errors" : errors.Count == 0 ? "Cancel orders successfully" : "Cancel orders with errors", errors);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}