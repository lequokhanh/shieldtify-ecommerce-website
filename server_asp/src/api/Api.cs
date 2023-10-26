using shieldtify.api.auth;

namespace shieldtify.api;

public static class Group
{
    public static RouteGroupBuilder ApiV1(this RouteGroupBuilder group)
    {
        group.MapGroup("/auth")
            .GroupAuth();
        return group;
    }
}