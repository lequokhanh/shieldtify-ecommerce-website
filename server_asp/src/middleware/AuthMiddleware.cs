using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using shieldtify.models;
using System.Diagnostics;
namespace shieldtify.middleware;
public class AuthMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _secretKey;

    public AuthMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _secretKey = "45b3ecf11da3223addf73ea73912512701ce29d5171451f084ab1ddae1064ea85c5209ba69c190cf8223f58fd771e5a0aaff922be094f7cb101f4aac1c1a1986";
    }

    public async Task Invoke(HttpContext context)
    {
        var token = context.Request.Cookies["token"];
        if (token != null)
            attachUserToContext(context, token);
        await _next(context);
    }

    private void attachUserToContext(HttpContext context, string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secretKey);
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero,

            }, out SecurityToken validatedToken);
            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = jwtToken.Claims.First(x => x.Type == "user_id").Value;
            var role = jwtToken.Claims.First(x => x.Type == "role").Value;
            using var dbContext = new ShieldtifyContext();
            switch (role)
            {
                case "admin":
                case "staff":
                    var user = dbContext.Accounts.Find(Guid.Parse(userId));
                    if (user != null)
                    {
                        context.Items["User"] = user;
                        context.Items["Role"] = user.Role;
                    }
                    break;
                case "client":
                    var client = dbContext.ClientAccounts.Find(Guid.Parse(userId));
                    if (client != null)
                    {
                        context.Items["User"] = client;
                        context.Items["Role"] = "client";
                    }
                    break;
                default:
                    break;
            }
        }
        catch
        {
            // do nothing if jwt validation fails
            // user is not attached to context so request won't have access to secure routes
        }
    }
}