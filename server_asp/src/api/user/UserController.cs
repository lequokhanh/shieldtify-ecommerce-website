using Microsoft.AspNetCore.Mvc;
using shieldtify.common;
using shieldtify.middleware;
using shieldtify.models;
namespace shieldtify.api.user
{
    public static class UserController
    {
        [Tags("User")]
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
    }

    public class CreateAddressBody
    {
        public required string address { get; set; }
        public required string city { get; set; }
        public required string province { get; set; }
        public required string phone_number { get; set; }
        public required bool is_default { get; set; }
    }
}