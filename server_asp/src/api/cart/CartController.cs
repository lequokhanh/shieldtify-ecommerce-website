using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using shieldtify.common;
using shieldtify.middleware;
using shieldtify.models;

namespace shieldtify.api.cart
{
    public static class CartController
    {
        [Tags("Cart")]
        public static APIRes getCart(HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = (ClientAccount?)context.Items["User"];
                    var DTO = CartService.getCart(user.Uid.ToString());
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Cart")]
        public static APIRes updateCart(HttpContext context, [FromBody] UpdateCartBody body)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = (ClientAccount?)context.Items["User"];
                    var DTO = CartService.updateCart(user.Uid.ToString(), body.item, int.Parse(body.quantity));
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Cart")]
        public static APIRes deleteCartItem(HttpContext context, [FromQuery] string item)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = (ClientAccount?)context.Items["User"];
                    var DTO = CartService.deleteCartItem(user.Uid.ToString(), item);
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("Cart")]
        public static APIRes deleteCart(HttpContext context)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = (ClientAccount?)context.Items["User"];
                    var DTO = CartService.deleteCart(user.Uid.ToString());
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("Cart")]
        public static APIRes addCartItem(HttpContext context, [FromBody] AddCartItemBody body)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = (ClientAccount?)context.Items["User"];
                    var DTO = CartService.addCartItem(user.Uid.ToString(), body.item, int.Parse(body.quantity));
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }


        }
        public static APIRes getDiscount(HttpContext context, [FromQuery] string code)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = (ClientAccount?)context.Items["User"];
                    var DTO = CartService.getDiscount(user.Uid.ToString(), code);
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

    public class UpdateCartBody
    {
        public required string item { get; set; }
        public required string quantity { get; set; }
    }

    public class AddCartItemBody
    {
        public required string item { get; set; }
        public required string quantity { get; set; }
    }
}