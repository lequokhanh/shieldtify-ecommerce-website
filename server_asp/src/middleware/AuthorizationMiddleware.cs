using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace shieldtify.middleware;

public class AuthorizationMiddleware
{
    public static string Authorize(HttpContext context, List<string> role)
    {
        // print out the role
        Console.WriteLine(role[0]);
        var userRole = context.Request.Cookies["role"];
        if (userRole != null && role.Contains(userRole.ToString()))
            return "Authorized";
        else
            return "Forbidden";
    }
}
