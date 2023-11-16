using shieldtify.api.auth;
using shieldtify.api.product;
namespace shieldtify.api;

public static class Group
{
    public static RouteGroupBuilder ApiV1(this RouteGroupBuilder group)
    {
        group.MapGroup("/auth")
            .GroupAuth();
        group.MapGroup("/product")
            .GroupProduct();
        return group;
    }
}