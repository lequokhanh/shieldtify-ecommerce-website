using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using shieldtify.common;
using shieldtify.models;
using BC = BCrypt.Net.BCrypt;
namespace shieldtify.api.auth
{
    public class AuthService
    {
        public static APIRes existedEmail(string email)
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
        public static APIRes sendEmailRegister(string email)
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
                // generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("45b3ecf11da3223addf73ea73912512701ce29d5171451f084ab1ddae1064ea85c5209ba69c190cf8223f58fd771e5a0aaff922be094f7cb101f4aac1c1a1986");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("email", email),
                        new Claim("token", authToken.Token),
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha512Signature),
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var emailService = new EmailService();
                emailService.SendMailForCreatePassword(email, tokenHandler.WriteToken(token)).Wait();
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
                var key = Encoding.ASCII.GetBytes("45b3ecf11da3223addf73ea73912512701ce29d5171451f084ab1ddae1064ea85c5209ba69c190cf8223f58fd771e5a0aaff922be094f7cb101f4aac1c1a1986");
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
                // hash password
                var salt = BC.GenerateSalt();
                var hashed = BC.HashPassword(password, salt);
                var client = new ClientAccount
                {
                    Uid = Guid.NewGuid(),
                    Username = username,
                    Password = hashed,
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
        public static APIRes checkToken(string token, string used_to)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("45b3ecf11da3223addf73ea73912512701ce29d5171451f084ab1ddae1064ea85c5209ba69c190cf8223f58fd771e5a0aaff922be094f7cb101f4aac1c1a1986");
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero,
                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                if (jwtToken == null)
                    return new APIRes(400, "Token is invalid");
                if (jwtToken.ValidTo < DateTime.UtcNow)
                    return new APIRes(400, "Token is invalid");
                var tokenValue = jwtToken.Claims.First(x => x.Type == "token").Value;
                using var dbContext = new ShieldtifyContext();
                var authToken = dbContext.Authenticates.Where(i => i.Token == tokenValue).FirstOrDefault();
                if (authToken == null)
                    return new APIRes(400, "Token is invalid");
                if (authToken.IsUsed)
                    return new APIRes(400, "Token is invalid");
                if (authToken.UsedTo != used_to)
                    return new APIRes(400, "Token is invalid");
                return new APIRes(200, "Token is valid");
            }
            catch (System.Exception)
            {
                throw;
            }
        }
        public static APIRes login(string password, string username, string email)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                ClientAccount? user = null;
                if (username != "")
                    user = dbContext.ClientAccounts.Where(i => i.Username == username).FirstOrDefault();
                else if (email != "")
                    user = dbContext.ClientAccounts.Where(i => i.Email == email).FirstOrDefault();
                else
                    return new APIRes(400, "Username or email is required");
                if (user == null)
                    return new APIRes(400, "Username or email is incorrect");
                if (!BC.Verify(password, user.Password))
                    return new APIRes(400, "Username or email is incorrect");
                // generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("45b3ecf11da3223addf73ea73912512701ce29d5171451f084ab1ddae1064ea85c5209ba69c190cf8223f58fd771e5a0aaff922be094f7cb101f4aac1c1a1986");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("user_id", user.Uid.ToString()),
                        new Claim("role", "client")
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha512Signature),
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return new APIRes(200, "Login successfully", tokenHandler.WriteToken(token));
            }
            catch (System.Exception)
            {
                throw;
            }
        }
        public static APIRes loginAdmin(string username, string password)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var user = dbContext.Accounts.Where(i => i.Username == username).FirstOrDefault();
                if (user == null)
                    return new APIRes(400, "Username or password is incorrect");
                if (!BC.Verify(password, user.Password))
                    return new APIRes(400, "Username or password is incorrect");
                // generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("45b3ecf11da3223addf73ea73912512701ce29d5171451f084ab1ddae1064ea85c5209ba69c190cf8223f58fd771e5a0aaff922be094f7cb101f4aac1c1a1986");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("user_id", user.Uid.ToString()),
                        new Claim("role", "admin")
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha512Signature),
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return new APIRes(200, "Login successfully", tokenHandler.WriteToken(token));
            }
            catch (System.Exception)
            {
                throw;
            }
        }
        public static APIRes sendEmailResetPassword(string email)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var user = dbContext.ClientAccounts.Where(i => i.Email == email).FirstOrDefault();
                if (user == null)
                    return new APIRes(400, "Email not existed");
                var authToken = new Authenticate
                {
                    Uid = Guid.NewGuid(),
                    Token = Guid.NewGuid().ToString(),
                    UsedTo = "reset-password",
                };
                dbContext.Authenticates.Add(authToken);
                dbContext.SaveChanges();
                // generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("45b3ecf11da3223addf73ea73912512701ce29d5171451f084ab1ddae1064ea85c5209ba69c190cf8223f58fd771e5a0aaff922be094f7cb101f4aac1c1a1986");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("user_id", user.Uid.ToString()),
                        new Claim("token", authToken.Token),
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha512Signature),
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var emailService = new EmailService();
                emailService.SendMailForResetPassword(email, tokenHandler.WriteToken(token)).Wait();
                return new APIRes(200, "Send email successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes resetPassword(string token, string password)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("45b3ecf11da3223addf73ea73912512701ce29d5171451f084ab1ddae1064ea85c5209ba69c190cf8223f58fd771e5a0aaff922be094f7cb101f4aac1c1a1986");
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero,
                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                var tokenValue = jwtToken.Claims.First(x => x.Type == "token").Value;
                var userId = jwtToken.Claims.First(x => x.Type == "user_id").Value;
                using var dbContext = new ShieldtifyContext();
                var authToken = dbContext.Authenticates.Where(i => i.Token == tokenValue).FirstOrDefault();
                if (authToken == null)
                    return new APIRes(400, "Token is invalid");
                if (authToken.IsUsed)
                    return new APIRes(400, "Token is invalid");
                if (authToken.UsedTo != "reset-password")
                    return new APIRes(400, "Token is invalid");
                var user = dbContext.ClientAccounts.Where(i => i.Uid.ToString() == userId).FirstOrDefault();
                if (user == null)
                    return new APIRes(400, "Token is invalid");
                // hash password
                var salt = BC.GenerateSalt();
                var hashed = BC.HashPassword(password, salt);
                user.Password = hashed;
                // mark token as used
                authToken.IsUsed = true;
                dbContext.SaveChanges();
                return new APIRes(200, "Reset password successfully");
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}