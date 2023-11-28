namespace shieldtify.api.cart
{
    public static class Cart
    {
        public static RouteGroupBuilder GroupCart(this RouteGroupBuilder group)
        {
            group.MapGet("/", CartController.getCart);
            group.MapPut("/", CartController.updateCart);
            group.MapDelete("/", CartController.deleteCart);
            group.MapPost("/", CartController.createCartItem);
            group.MapGet("/discount", CartController.getDiscount);
            group.MapPost("/checkout", CartController.checkout);
            return group;
        }
    }
}