namespace shieldtify.api.user
{
    public static class User
    {
        public static RouteGroupBuilder GroupUser(this RouteGroupBuilder group)
        {
            group.MapGet("/me", UserController.getUser);
            return group;
        }
    }
}