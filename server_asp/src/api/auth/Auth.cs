namespace shieldtify.api.auth
{
    public static class Auth
    {
        public static RouteGroupBuilder GroupAuth(this RouteGroupBuilder group)
        {
            group.MapGet("/existed-email", AuthController.existedEmail);
            group.MapGet("/send-email-register", AuthController.sendEmailRegister);
            group.MapPost("/register", AuthController.register);
            group.MapGet("/check-token", AuthController.checkToken);
            group.MapPost("/login/client", AuthController.login);
            group.MapPost("/login/admin", AuthController.loginAdmin);
            group.MapPost("/logout", AuthController.logout);
            group.MapGet("/send-email-reset-password", AuthController.sendEmailResetPassword);
            group.MapPost("/reset-password", AuthController.resetPassword);
            return group;
        }
    }
}