using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace shieldtify.middleware;

public class AuthorizationMiddleware
{
    public static string Authorize(HttpContext context, List<string> role)
    {
        var userRole = context.Request.Cookies["role"];
        if (userRole != null && role.Contains(userRole.ToString()))
            return "Authorized";
        else
            return "Forbidden";
    }
}
