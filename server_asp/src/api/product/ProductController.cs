using Microsoft.AspNetCore.Mvc;
using shieldtify.common;

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
    }

}
