using System.Security.Principal;
using Microsoft.AspNetCore.Mvc;
using shieldtify.common;
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

}