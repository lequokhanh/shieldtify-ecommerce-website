using Microsoft.AspNetCore.Mvc;
using shieldtify.common;
using shieldtify.models;
using shieldtify.middleware;
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