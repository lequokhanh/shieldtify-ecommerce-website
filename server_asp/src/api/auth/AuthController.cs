using System.Security.Principal;
using Microsoft.AspNetCore.Mvc;
using shieldtify.common;
using shieldtify.middleware;
namespace shieldtify.api.auth
{
    public static class AuthController
    {
        [Tags("Auth")]
        public static object existedEmail([FromQuery] string email)
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
        public static object sendEmailRegister([FromBody] string email)
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
        public static object register([FromBody] string token, [FromBody] string password, [FromBody] string username, [FromBody] string displayname, HttpContext context)
        {
            try
            {
                var DTO = AuthService.register(token, username, password, displayname);
                context.Response.StatusCode = DTO.statusCode;
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }

}