using Microsoft.AspNetCore.Mvc;
using shieldtify.common;
using shieldtify.middleware;
using shieldtify.models;

namespace shieldtify.api.product
{
    public static class ProductController
    {

        [Tags("Product")]
        public static APIRes getAllProduct(HttpContext context, [FromQuery] string page = "1", string sort = "popular", string priceRange = "", string keyword = "", string brands = "")
        {
            try
            {
                var DTO = ProductService.getAllProduct(int.Parse(page), sort, priceRange, brands, keyword);
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes getAllCategory()
        {
            try
            {
                var DTO = ProductService.getAllCategory();
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes getAllProductByCategory(HttpContext context, string category, [FromQuery] string page = "1", string sort = "popular", string priceRange = "", string keyword = "", string brands = "")
        {
            try
            {
                var DTO = ProductService.getAllProductByCategory(category, int.Parse(page), sort, priceRange, brands, keyword);
                context.Response.StatusCode = DTO.statusCode;
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes getProductDetail(string id, HttpContext context)
        {
            try
            {
                var DTO = ProductService.getProductDetail(id);
                context.Response.StatusCode = DTO.statusCode;
                return DTO;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes getAllBrand(HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = ProductService.getAllBrand();
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes createBrand(HttpContext context, [FromBody] CreateBrandBody brand)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = ProductService.createBrand(brand);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes createProduct(HttpContext context, [FromBody] CreateProductBody product)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = ProductService.createProduct(product);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes updateProduct(HttpContext context, string productid, [FromBody] UpdateProductBody product)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = ProductService.updateProduct(productid, product);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes updateProductForStaff(HttpContext context, string productid, [FromBody] UpdateProductBody product)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    List<string> allowedUpdates = new List<string> { "description" };
                    List<string> updates = product.GetType().GetProperties().Select(x => x.Name).ToList();
                    bool isValidOperation = updates.All(x => allowedUpdates.Contains(x));
                    if (!isValidOperation)
                    {
                        return new APIRes(400, "Invalid updates!");
                    }
                    var DTO = ProductService.updateProduct(productid, product);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes addImagesToProduct(HttpContext context, string productid, [FromBody] AddImagesToProductBody images)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = ProductService.addImagesToProduct(productid, images);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes deleteImageFromProduct(HttpContext context, string productid, string imgid)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = ProductService.deleteImageFromProduct(productid, imgid);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes setDefaultImage(HttpContext context, string productid, string imgid)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = ProductService.setDefaultImage(productid, imgid);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes createCategory(HttpContext context, [FromBody] CreateCategoryBody category)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = ProductService.createCategory(category);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Product")]
        public static APIRes updateCategory(HttpContext context, string categoryid, [FromBody] UpdateCategoryBody category)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var DTO = ProductService.updateCategory(categoryid, category);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "superadmin", "admin" });
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
    public class CreateBrandBody
    {
        public string name { get; set; }
        public string description { get; set; }
    }

    public class CreateProductBody
    {
        public string categoryid { get; set; }
        public string brandid { get; set; }
        public string name { get; set; }
        public string specification { get; set; }
        public string description { get; set; }
        public int price { get; set; }
        public int stock_qty { get; set; }

    }

    public class UpdateProductBody
    {
        public string? categoryid { get; set; }
        public string? brandid { get; set; }
        public string? name { get; set; }
        public string? specification { get; set; }
        public string? description { get; set; }
        public float? price { get; set; }
        public int? stock_qty { get; set; }
    }

    public class AddImagesToProductBody
    {
        public List<Img> imgs { get; set; }
    }

    public class Img
    {
        public string link { get; set; }
        public bool isPrimary { get; set; }
    }

    public class CreateCategoryBody
    {
        public string name { get; set; }
        public string description { get; set; }
    }

    public class UpdateCategoryBody
    {
        public string? name { get; set; }
        public string? description { get; set; }
    }


}
