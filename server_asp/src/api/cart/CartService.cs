using shieldtify.common;
using shieldtify.models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
namespace shieldtify.api.cart
{
    public static class CartService
    {
        public static APIRes getCart(string clientID)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var cart = db.CartItems.Where(i => i.Clientid.ToString() == clientID && i.Quantity <= i.Item.StockQty).Select(i => new
                {
                    name = i.Item.Name,
                    quantity = i.Quantity,
                    price = i.Item.Price,
                    primary_img = i.Item.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault(),
                    itemid = i.Itemid
                }).ToList();
                var itemOutOfStock = db.CartItems.Where(i => i.Clientid.ToString() == clientID && i.Quantity > i.Item.StockQty).Select(i => new
                {
                    name = i.Item.Name,
                    quantity = i.Quantity,
                    price = i.Item.Price,
                    primary_img = i.Item.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault(),
                    itemid = i.Itemid
                }).ToList();
                float total = 0;
                foreach (var item in cart)
                {
                    total += item.price * item.quantity;
                }
                return new APIRes(200, "Get cart successfully", new
                {
                    cart,
                    total = Math.Round(total, 2),
                    out_of_stock = itemOutOfStock
                });
            }
            catch (System.Exception)
            {
                throw;
            }
        }
        public static APIRes updateCart(string clientID, string itemID, int quantity)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var cartItem = db.CartItems.Where(i => i.Clientid.ToString() == clientID && i.Itemid.ToString() == itemID).FirstOrDefault();
                if (cartItem == null)
                    return new APIRes(404, "Item not found in cart");
                if (quantity < 1)
                    db.CartItems.Remove(cartItem);
                else
                {
                    var item = db.Items.Where(i => i.Uid.ToString() == itemID).FirstOrDefault();
                    if (quantity > item.StockQty)
                    {
                        if (item.StockQty == 0)
                            db.CartItems.Remove(cartItem);
                        else
                            cartItem.Quantity = item.StockQty;
                    }
                    cartItem.Quantity = quantity;
                }
                db.SaveChanges();
                var cart = db.CartItems.Where(i => i.Clientid.ToString() == clientID && i.Quantity <= i.Item.StockQty).Select(i => new
                {
                    name = i.Item.Name,
                    quantity = i.Quantity,
                    price = i.Item.Price,
                    primary_img = i.Item.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault(),
                    itemid = i.Itemid
                }).ToList();
                var itemOutOfStock = db.CartItems.Where(i => i.Clientid.ToString() == clientID && i.Quantity > i.Item.StockQty).Select(i => new
                {
                    name = i.Item.Name,
                    quantity = i.Quantity,
                    price = i.Item.Price,
                    primary_img = i.Item.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault(),
                    itemid = i.Itemid
                }).ToList();
                float total = 0;
                foreach (var item in cart)
                {
                    total += item.price * item.quantity;
                }
                return new APIRes(200, "Update cart successfully", new
                {
                    cart,
                    total = Math.Round(total, 2),
                    out_of_stock = itemOutOfStock
                });
            }
            catch (System.Exception)
            {

                throw;
            }
        }

        public static APIRes deleteCart(string clientID)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var cartItems = db.CartItems.Where(i => i.Clientid.ToString() == clientID).ToList();
                if (cartItems == null)
                {
                    return new APIRes(404, "Cart not found");
                }
                db.CartItems.RemoveRange(cartItems);
                db.SaveChanges();
                return new APIRes(200, "Delete cart successfully");
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public static APIRes createCartItem(string clientID, List<Items> items)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var error = new List<object>();
                foreach (var item in items)
                {
                    var itemObj = db.Items.Where(i => i.Uid.ToString() == item.item).FirstOrDefault();
                    if (item.quantity < 1)
                        error.Add(new { item.item, message = "Quantity must be greater than 0" });
                    if (itemObj == null)
                        error.Add(new { item.item, message = "Item not found" });
                    var cartItem = db.CartItems.Where(i => i.Clientid.ToString() == clientID && i.Itemid.ToString() == item.item).FirstOrDefault();
                    if (cartItem != null)
                    {
                        if (cartItem.Quantity + item.quantity > itemObj.StockQty)
                            error.Add(new { item.item, message = "Quantity is greater than stock quantity" });
                        else
                            cartItem.Quantity += item.quantity;
                    }
                    else
                    {
                        db.CartItems.Add(new CartItem
                        {
                            Clientid = Guid.Parse(clientID),
                            Itemid = Guid.Parse(item.item),
                            Quantity = item.quantity
                        });
                    }
                }
                db.SaveChanges();
                return new APIRes(200, "Create cart item successfully", error);
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public static APIRes getDiscount(string clientID, string code)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var promotion = db.Promotions.Where(i => i.Code == code).FirstOrDefault();
                if (promotion == null)
                    return new APIRes(404, "Promotion not found");
                var cart = db.CartItems.Where(i => i.Clientid.ToString() == clientID && i.Quantity <= i.Item.StockQty).Select(i => new
                {
                    name = i.Item.Name,
                    quantity = i.Quantity,
                    price = i.Item.Price,
                    primary_img = i.Item.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault(),
                    itemid = i.Itemid,
                    categoryid = i.Item.Categoryid
                }).ToList();
                var itemOutOfStock = db.CartItems.Where(i => i.Clientid.ToString() == clientID && i.Quantity > i.Item.StockQty).Select(i => new
                {
                    name = i.Item.Name,
                    quantity = i.Quantity,
                    price = i.Item.Price,
                    primary_img = i.Item.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault(),
                    itemid = i.Itemid
                }).ToList();
                var condition = JsonConvert.DeserializeObject<JObject>(promotion.Condition);
                var discountRate = promotion.DiscountRate;
                var maxDiscount = promotion.MaxDiscount;
                var type = promotion.Type;
                float total = 0;
                float discount = 0;
                var items = new List<object>();
                if (type == "by total")
                {
                    foreach (var item in cart)
                    {
                        items.Add(new
                        {
                            name = item.name,
                            quantity = item.quantity,
                            primary_img = item.primary_img,
                            old_price = item.price,
                            new_price = item.price
                        });
                        total += item.price * item.quantity;
                    }
                    if (int.Parse(condition["total"].ToString()) <= total)
                        return new APIRes(400, "Total is not enough to get discount");
                    discount = Math.Max(total * discountRate, maxDiscount);
                    total -= discount;
                }
                else
                {
                    var flag = false;
                    foreach (var item in cart)
                    {
                        float newPrice = item.price;
                        if ((condition["item"][0].ToString() == "*" && (condition["category"][0].ToString() == "*" || condition["category"].ToObject<List<string>>().Contains(item.categoryid.ToString()))) || condition["item"].ToObject<List<string>>().Contains(item.itemid.ToString()))
                        {
                            items.Add(new
                            {
                                item.name,
                                item.quantity,
                                item.primary_img,
                                old_price = item.price,
                                new_price = item.price - Math.Max(item.price * discountRate, maxDiscount)
                            });
                            flag = true;
                        }
                        else
                        {
                            items.Add(new
                            {
                                item.name,
                                item.quantity,
                                item.primary_img,
                                old_price = item.price,
                                new_price = item.price
                            });
                        }
                        total += newPrice * item.quantity;
                        discount += Math.Max(newPrice * discountRate, maxDiscount);
                    }
                    if (!flag)
                        return new APIRes(400, "No item in cart is eligible for discount");
                }
                return new APIRes(200, "Get discount successfully", new
                {
                    cart = items,
                    discount = Math.Round(discount, 2),
                    total = Math.Round(total, 2),
                    out_of_stock = itemOutOfStock
                });
            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}