namespace shieldtify.api.cart
{
    public static class Cart
    {
        public static RouteGroupBuilder GroupCart(this RouteGroupBuilder group)
        {
            group.MapGet("/", CartController.getCart);
            group.MapPut("/", CartController.updateCart);
            group.MapDelete("/", CartController.deleteCartItem);
            group.MapDelete("/all", CartController.deleteCart);
            group.MapPost("/", CartController.addCartItem);
            group.MapGet("/discount", CartController.getDiscount);
            return group;
        }
    }
}