namespace shieldtify.api.auth
{
    public static class Auth
    {
        public static RouteGroupBuilder GroupAuth(this RouteGroupBuilder group)
        {
            group.MapGet("/existed-email", AuthController.existedEmail);
            group.MapPost("/send-email-register", AuthController.sendEmailRegister);
            group.MapPost("/register", AuthController.register);
            return group;
        }
    }
}