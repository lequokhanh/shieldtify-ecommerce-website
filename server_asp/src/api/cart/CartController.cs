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
                    context.Response.StatusCode = DTO.statusCode;
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
                    var DTO = CartService.updateCart(user.Uid.ToString(), body.item, body.quantity);
                    context.Response.StatusCode = DTO.statusCode;
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
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Tags("Cart")]
        public static APIRes createCartItem(HttpContext context, [FromBody] AddCartItemBody body)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = (ClientAccount?)context.Items["User"];
                    var DTO = CartService.createCartItem(user.Uid.ToString(), body.items);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Cart")]
        public static APIRes getDiscount(HttpContext context, [FromQuery] string code)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = (ClientAccount?)context.Items["User"];
                    var DTO = CartService.getDiscount(user.Uid.ToString(), code);
                    context.Response.StatusCode = DTO.statusCode;
                    return DTO;
                }, context, new List<string> { "client" });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Tags("Cart")]
        public static APIRes checkout(HttpContext context, [FromBody] CheckoutBody body)
        {
            try
            {
                return Middleware.MiddlewareAuthorize(() =>
                {
                    var user = (ClientAccount?)context.Items["User"];
                    var DTO = CartService.checkout(user.Uid.ToString(), body);
                    context.Response.StatusCode = DTO.statusCode;
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
        public required int quantity { get; set; }
    }

    public class AddCartItemBody
    {
        public required List<Items> items { get; set; }
    }

    public class Items
    {
        public required string item { get; set; }
        public required int quantity { get; set; }
    }

    public class CheckoutBody
    {
        public string? code { get; set; }
        public required string payment_method { get; set; }
        public required string receive_method { get; set; }
        public required string shipping_addressid { get; set; }
    }
}