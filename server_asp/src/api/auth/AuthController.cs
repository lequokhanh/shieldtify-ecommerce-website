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
        public static APIRes sendEmailRegister([FromBody] SendEmailBody body)
        {
            try
            {
                var DTO = AuthService.sendEmailRegister(body.email);
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Auth")]
        public static APIRes register([FromBody] RegisterBody body, HttpContext context)
        {
            try
            {
                var DTO = AuthService.register(body.token, body.username, body.password, body.displayname);
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
        public required string token { get; set; }
        public required string username { get; set; }
        public required string password { get; set; }
        public required string displayname { get; set; }
    }

}