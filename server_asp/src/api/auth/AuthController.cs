using Microsoft.AspNetCore.Mvc;
using shieldtify.common;
using shieldtify.models;
namespace shieldtify.api.auth
{
    public static class AuthController
    {
        [Tags("Auth")]
        public static APIRes existedEmail([FromQuery] string email)
        {
            try
            {
                var DTO = AuthService.existedEmail(email);
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Auth")]
        public static APIRes sendEmailRegister([FromQuery] string email)
        {
            try
            {
                var DTO = AuthService.sendEmailRegister(email);
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Auth")]
        public static APIRes register([FromQuery] string token, [FromBody] RegisterBody body, HttpContext context)
        {
            try
            {
                var DTO = AuthService.register(token, body.username, body.password, body.displayname);
                context.Response.StatusCode = DTO.statusCode;
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("Auth")]
        public static APIRes checkToken([FromQuery] string token, string used_to, HttpContext context)
        {
            try
            {
                var DTO = AuthService.checkToken(token, used_to);
                context.Response.StatusCode = DTO.statusCode;
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Auth")]
        public static APIRes login([FromBody] LoginBody body, HttpContext context)
        {
            try
            {
                var DTO = AuthService.login(body.password, body.username ?? "", body.email ?? "");
                context.Response.StatusCode = DTO.statusCode;
                if (DTO.statusCode != 200)
                    return DTO;
                context.Response.Cookies.Append("token", DTO.data.ToString(), new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    MaxAge = TimeSpan.FromDays(1)
                });
                DTO.data = null;
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Auth")]
        public static APIRes logout(HttpContext context)
        {
            try
            {
                context.Response.Cookies.Delete("token");
                return new APIRes(200, "Logout successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Auth")]
        public static APIRes getUser(HttpContext context)
        {
            try
            {
                if (context.Items["User"] == null)
                {
                    context.Response.StatusCode = 400;
                    return new APIRes(400, "Token is invalid");
                }
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
                        deletedAt = user?.DeletedAt,
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
                        deletedAt = user?.DeletedAt,
                    });
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Auth")]
        public static APIRes sendEmailResetPassword([FromQuery] string email)
        {
            try
            {
                var DTO = AuthService.sendEmailResetPassword(email);
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("Auth")]
        public static APIRes resetPassword([FromQuery] string token, [FromBody] ResetPasswordBody body, HttpContext context)
        {
            try
            {
                var DTO = AuthService.resetPassword(token, body.password);
                context.Response.StatusCode = DTO.statusCode;
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
    public class SendEmailBody
    {
        public required string email { get; set; }
    }
    public class RegisterBody
    {
        public required string username { get; set; }
        public required string password { get; set; }
        public required string displayname { get; set; }
    }
    public class LoginBody
    {
        public string? username { get; set; }
        public required string password { get; set; }

        public string? email { get; set; }
    }

    public class ResetPasswordBody
    {
        public required string password { get; set; }
    }

}