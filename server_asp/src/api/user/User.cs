namespace shieldtify.api.user
{
    public static class User
    {
        public static RouteGroupBuilder GroupUser(this RouteGroupBuilder group)
        {
            group.MapGet("/me", UserController.getUser);
            group.MapGet("/address", UserController.getAddresses);
            group.MapPost("/address", UserController.createAddress);
            return group;
        }
    }
}