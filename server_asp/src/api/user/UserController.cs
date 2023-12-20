using Microsoft.AspNetCore.Mvc;
using shieldtify.common;
using shieldtify.middleware;
using shieldtify.models;
namespace shieldtify.api.user
{
    public static class UserController
    {
        [Tags("User -> Client")]
        public static APIRes getUser(HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthenticate(() =>
                {
                    var role = context.Items["Role"] as string;
                    if (role == "client")
                    {
                        var user = context.Items["User"] as ClientAccount;
                        return new APIRes(200, "Get user successfully", new
                        {
                            uid = user?.Uid,
                            username = user?.Username,
                            display_name = user?.DisplayName,
                            email = user?.Email,
                            role,
                            changed_password_at = user?.ChangedPasswordAt,
                            createdAt = user?.CreatedAt,
                            updatedAt = user?.UpdatedAt,
                        });
                    }
                    else
                    {
                        var user = context.Items["User"] as Account;
                        return new APIRes(200, "Get user successfully", new
                        {
                            uid = user?.Uid,
                            username = user?.Username,
                            display_name = user?.DisplayName,
                            role,
                            changed_password_at = user?.ChangedPasswordAt,
                            createdAt = user?.CreatedAt,
                            updatedAt = user?.UpdatedAt,
                        });
                    }
                }, context);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("User -> Client")]
        public static APIRes getAddresses(HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = context.Items["User"] as ClientAccount;
                    var DTO = UserService.getAddresses(user.Uid.ToString());
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("User -> Client")]
        public static APIRes createAddress(HttpContext context, [FromBody] CreateAddressBody body)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = context.Items["User"] as ClientAccount;
                    var DTO = UserService.createAddress(user.Uid.ToString(), body);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("User -> Admin")]
        public static APIRes getClients([FromQuery] string? page, string? keyword, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.getClients(
                        int.Parse(page ?? "1"),
                        keyword ?? ""
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "admin", "superadmin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("User -> Admin")]
        public static APIRes getClientById([FromRoute] string userId, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.getClientById(userId);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "admin", "superadmin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("User -> Admin")]
        public static APIRes updateClient([FromRoute] string userId, [FromBody] UpdateClientBody body, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.updateClient(userId, body);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "admin", "superadmin" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Admin")]
        public static APIRes deleteAddressAdmin([FromRoute] string userId, [FromQuery] string addressId, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.deleteAddress(
                        userId,
                        addressId
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "admin", "superadmin" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Admin")]
        public static APIRes getAccounts([FromQuery] string? page, string? keyword, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.getAccounts(
                        int.Parse(page ?? "1"),
                        keyword ?? ""
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "admin", "superadmin" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Admin")]
        public static APIRes updateAccount([FromRoute] string id, [FromBody] UpdateAccountBody body, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.updateAccount(
                        context.Items["Role"] as string,
                        (context.Items["User"] as Account).Uid.ToString(),
                        id,
                        body
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "admin", "superadmin" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Admin")]
        public static APIRes resetPassword([FromRoute] string id, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.resetPassword(
                        context.Items["Role"] as string,
                        id
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "admin", "superadmin" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Client")]
        public static APIRes updateProfileClient([FromBody] UpdateClientBody body, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.updateClient(
                        (context.Items["User"] as ClientAccount).Uid.ToString(),
                        body
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Admin")]
        public static APIRes updateAddressAdmin([FromRoute] string userId, [FromQuery] string addressId, [FromBody] CreateAddressBody body, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.updateAddress(
                        userId,
                        addressId,
                        body
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "admin", "superadmin" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Client")]
        public static APIRes updateAddress([FromRoute] string addressId, [FromBody] CreateAddressBody body, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.updateAddress(
                        (context.Items["User"] as ClientAccount).Uid.ToString(),
                        addressId,
                        body
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Client")]
        public static APIRes deleteAddressClient([FromRoute] string addressId, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.deleteAddress(
                        (context.Items["User"] as ClientAccount).Uid.ToString(),
                        addressId
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Admin")]
        public static APIRes getAllOrders([FromQuery] string? page, string? keyword, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.getAllOrders(
                        int.Parse(page ?? "1"),
                        keyword ?? ""
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "admin", "superadmin" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Client")]
        public static APIRes getOrderByClientID(HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.getOrderByClientID(
                        (context.Items["User"] as ClientAccount).Uid.ToString()
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("User -> Client")]
        public static APIRes getOrderByIdClient([FromRoute] string orderId, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.getOrderByID(
                        orderId,
                        (context.Items["User"] as ClientAccount).Uid.ToString()
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("User -> Admin")]
        public static APIRes getOrderByIdAdmin([FromQuery] string userId, [FromQuery] string orderId, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.getOrderByID(
                        orderId,
                        userId
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "admin", "superadmin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("User -> Admin")]
        public static APIRes createStaff([FromBody] CreateStaffBody body, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.createStaff(
                        context.Items["Role"] as string,
                        body
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("User -> Admin")]
        public static APIRes getOrdersByStatus([FromQuery] string status, string? page, string? keyword, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.getOrdersByStatus(
                        status,
                        int.Parse(page ?? "1"),
                        keyword ?? ""
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin", "staff" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("User -> Admin")]
        public static APIRes updateOrder([FromRoute] string orderId, [FromBody] UpdateOrderBody body, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.updateOrder(
                        (context.Items["User"] as Account).Uid.ToString(),
                        orderId,
                        body
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin", "staff" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("User -> Admin")]
        public static APIRes processOrders([FromQuery] string? type, [FromBody] List<string> orders, HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = UserService.processOrders(
                        (context.Items["User"] as Account).Uid.ToString(),
                        orders,
                        int.Parse(type ?? "1")
                    );
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin", "staff" });
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

    public class CreateAddressBody
    {
        public required string address { get; set; }
        public required string city { get; set; }
        public required string province { get; set; }
        public required string phone_number { get; set; }
        public required bool is_default { get; set; }
    }

    public class UpdateClientBody
    {
        public string? username { get; set; }
        public string? display_name { get; set; }
    }

    public class UpdateAccountBody
    {
        public string? username { get; set; }
        public string? display_name { get; set; }
        public string? role { get; set; }
    }

    public class UpdateOrderBody
    {
        public string uid { get; set; }
        public string? order_status { get; set; }
        public string? shipping_addressid { get; set; }
        public string? payment_method { get; set; }
        public string? receive_method { get; set; }
        public List<OrderItemBody>? products { get; set; }
    }

    public class OrderItemBody
    {
        public string itemid { get; set; }
        public int? quantity { get; set; }
        public float? new_price { get; set; }
    }

    public class CreateStaffBody
    {
        public string username { get; set; }
        public string display_name { get; set; }
        public string role { get; set; }
    }
}