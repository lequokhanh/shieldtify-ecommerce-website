namespace shieldtify.api.product
{
    public static class Product
    {
        public static RouteGroupBuilder GroupProduct(this RouteGroupBuilder group)
        {
            group.MapGet("/", ProductController.getAllProduct);
            group.MapGet("/category", ProductController.getAllCategory);
            group.MapGet("/category/{category}", ProductController.getAllProductByCategory);
            group.MapGet("/{id}", ProductController.getProductDetail);
            return group;
        }
    }
}
