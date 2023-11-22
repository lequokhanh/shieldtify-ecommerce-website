using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using shieldtify.common;

namespace shieldtify.middleware;

public class Middleware
{
    public static APIRes MiddlewareAuthenticate(Func<APIRes> controller, HttpContext context)
    {
        try
        {
            if (context.Items["User"] == null)
            {
                context.Response.StatusCode = 401;
                return new APIRes(401, "Unauthorized");
            }
            return controller();
        }
        catch (System.Exception)
        {

            throw;
        }
    }

    public static APIRes MiddlewareAuthorize(Func<APIRes> controller, HttpContext context, List<string> role)
    {
        try
        {
            if (context.Items["User"] == null)
            {
                context.Response.StatusCode = 401;
                return new APIRes(401, "Unauthorized");
            }
            var userRole = context.Items["Role"];
            if (!role.Contains(userRole?.ToString()!))
            {
                context.Response.StatusCode = 403;
                return new APIRes(403, "Forbidden");
            }
            return controller();
        }
        catch (System.Exception)
        {

            throw;
        }
    }
}
