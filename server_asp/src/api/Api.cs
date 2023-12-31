using shieldtify.api.auth;
using shieldtify.api.product;
using shieldtify.api.cart;
using shieldtify.api.user;
namespace shieldtify.api;

public static class Group
{
    public static RouteGroupBuilder ApiV1(this RouteGroupBuilder group)
    {
        group.MapGroup("/auth")
            .GroupAuth();
        group.MapGroup("/product")
            .GroupProduct();
        group.MapGroup("/cart")
            .GroupCart();
        group.MapGroup("/user")
            .GroupUser();
        return group;
    }
}