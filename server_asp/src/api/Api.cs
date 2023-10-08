namespace test.api;

public static class Group
{
    public static RouteGroupBuilder ApiV1(this RouteGroupBuilder group)
    {
        group.MapGroup("/test")
            .GroupTest();
        group.MapGroup("/auth")
            .GroupAuth();
        return group;
    }
}