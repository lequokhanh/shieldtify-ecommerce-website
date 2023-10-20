using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using shieldtify.common;
using shieldtify.models;
namespace shieldtify.api.auth
{
    public class AuthService
    {
        public static object existedEmail(string email)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var existed = dbContext.ClientAccounts.Where(i => i.Email == email).FirstOrDefault() != null;
                return new APIRes(200, existed ? "Email existed" : "Email not existed");
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static object sendEmailRegister(string email)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var authToken = new Authenticate
                {
                    Uid = Guid.NewGuid(),
                    Token = Guid.NewGuid().ToString(),
                    UsedTo = "create-account",
                };
                dbContext.Authenticates.Add(authToken);
                dbContext.SaveChanges();
                // generate jwt
                var token = new JwtSecurityToken(
                    claims: new Claim[] {
                        new("email", email),
                        new("token", authToken.Token),
                    },
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes("default_secret_key")),
                        SecurityAlgorithms.HmacSha256
                    )
                );
                var emailService = new EmailService();
                emailService.SendMailForCreatePassword(email, token.ToString()).Wait();
                return new APIRes(200, "Send email successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes register(string token, string username, string password, string displayname)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("default_secret_key");
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero,
                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                var email = jwtToken.Claims.First(x => x.Type == "email").Value;
                var tokenValue = jwtToken.Claims.First(x => x.Type == "token").Value;
                using var dbContext = new ShieldtifyContext();
                var authToken = dbContext.Authenticates.Where(i => i.Token == tokenValue).FirstOrDefault();
                if (authToken == null)
                    return new APIRes(400, "Token is invalid");
                if (authToken.UsedTo != "create-account")
                    return new APIRes(400, "Token is invalid");
                var existed = dbContext.ClientAccounts.Where(i => i.Email == email).FirstOrDefault() != null;
                if (existed)
                    return new APIRes(400, "Email existed");
                var client = new ClientAccount
                {
                    Uid = Guid.NewGuid(),
                    Username = username,
                    Password = password,
                    DisplayName = displayname,
                    Email = email
                };
                // mark token as used
                authToken.IsUsed = true;
                dbContext.ClientAccounts.Add(client);
                dbContext.SaveChanges();
                return new APIRes(200, "Register successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}