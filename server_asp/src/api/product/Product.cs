namespace shieldtify.api.product
{
    public static class Product
    {
        public static RouteGroupBuilder GroupProduct(this RouteGroupBuilder group)
        {
            group.MapGet("/", ProductController.getAllProduct);
            group.MapPost("/", ProductController.createProduct);
            group.MapGet("/category", ProductController.getAllCategory);
            group.MapPost("/category", ProductController.createCategory);
            group.MapPut("/category/{categoryid}", ProductController.updateCategory);
            group.MapGet("/category/{category}", ProductController.getAllProductByCategory);
            group.MapGet("/brand", ProductController.getAllBrand);
            group.MapPost("/brand", ProductController.createBrand);
            group.MapPut("/staff/{productid}", ProductController.updateProductForStaff);
            group.MapPost("/image/{productid}", ProductController.addImagesToProduct);
            group.MapDelete("/image/{productid}", ProductController.deleteImageFromProduct);
            group.MapPut("/image/default/{productid}", ProductController.setDefaultImage);
            group.MapGet("/{id}", ProductController.getProductDetail);
            group.MapPut("/{productid}", ProductController.updateProduct);
            return group;
        }
    }
}
