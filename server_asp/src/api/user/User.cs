using Microsoft.AspNetCore.Components.Routing;

namespace shieldtify.api.user
{
    public static class User
    {
        public static RouteGroupBuilder GroupUser(this RouteGroupBuilder group)
        {
            group.MapGet("/me", UserController.getUser);
            group.MapGet("/address", UserController.getAddresses);
            group.MapPost("/address", UserController.createAddress);
            group.MapPut("/address/admin/{userId}", UserController.updateAddressAdmin);
            group.MapDelete("/address/admin/{userId}", UserController.deleteAddressAdmin);
            group.MapPut("/address/{addressId}", UserController.updateAddress);
            group.MapDelete("/address/{addressId}", UserController.deleteAddressClient);
            group.MapGet("/client/admin", UserController.getClients);
            group.MapGet("/client/admin/{userId}", UserController.getClientById);
            group.MapPut("/client/admin/{userId}", UserController.updateClient);
            group.MapGet("/staff", UserController.getAccounts);
            group.MapPut("/staff/{id}", UserController.updateAccount);
            group.MapPut("/staff/{id}/reset-password", UserController.resetPassword);
            group.MapPut("/profile/client", UserController.updateProfileClient);
            group.MapGet("/order/client", UserController.getOrderByClientID);
            group.MapGet("/order/client/{orderId}", UserController.getOrderByIdClient);
            group.MapGet("/order/admin", UserController.getAllOrders);
            group.MapGet("/order/admin/status", UserController.getOrdersByStatus);
            group.MapGet("/order/admin/{userId}", UserController.getOrderByIdAdmin);
            group.MapPut("/order/admin/process", UserController.processOrders);
            group.MapPut("/order/admin/{orderId}", UserController.updateOrder);
            return group;
        }
    }
}