using shieldtify.common;
using shieldtify.models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace shieldtify.api.cart
{
    public static class CartService
    {
        public static APIRes getCart(string clientID)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var cart = db.CartItems.Where(i => i.Clientid.ToString() == clientID).Select(i => new
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
                return new APIRes(200, "Get cart successfully", new { cart, total });
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
                if (quantity <= 0)
                    db.CartItems.Remove(cartItem);
                else
                    cartItem.Quantity = quantity;
                db.SaveChanges();
                return new APIRes(200, "Update cart successfully");
            }
            catch (System.Exception)
            {

                throw;
            }
        }

        public static APIRes deleteCartItem(string clientID, string itemID)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var cartItem = db.CartItems.Where(i => i.Clientid.ToString() == clientID && i.Itemid.ToString() == itemID).FirstOrDefault();
                if (cartItem == null)
                {
                    return new APIRes(404, "Item not found in cart");
                }
                db.CartItems.Remove(cartItem);
                db.SaveChanges();
                return new APIRes(200, "Delete cart item successfully");
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

        public static APIRes addCartItem(string clientID, string itemID, int quantity)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var item = db.Items.Where(i => i.Uid.ToString() == itemID).FirstOrDefault();
                if (item == null)
                    return new APIRes(404, "Item not found");
                if (quantity <= 0)
                    return new APIRes(400, "Quantity must be greater than 0");
                var cartItem = db.CartItems.Where(i => i.Clientid.ToString() == clientID && i.Itemid.ToString() == itemID).FirstOrDefault();
                if (cartItem != null)
                    return new APIRes(400, "Item already in cart");
                db.CartItems.Add(new CartItem
                {
                    Clientid = Guid.Parse(clientID),
                    Itemid = Guid.Parse(itemID),
                    Quantity = quantity,
                    CreatedAt = System.DateTime.Now,
                    UpdatedAt = System.DateTime.Now
                });
                db.SaveChanges();
                return new APIRes(200, "Add cart item successfully");
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
                var cart = db.CartItems.Where(i => i.Clientid.ToString() == clientID).Select(i => new
                {
                    name = i.Item.Name,
                    quantity = i.Quantity,
                    price = i.Item.Price,
                    primary_img = i.Item.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault(),
                    itemid = i.Itemid,
                    categoryid = i.Item.Categoryid
                }).ToList();
                var condition = JsonConvert.DeserializeObject<JObject>(promotion.Condition);
                var discountRate = promotion.DiscountRate;
                var maxDiscount = promotion.MaxDiscount;
                float total = 0;
                float discount = 0;
                var items = new List<object>();
                if (condition["total"].ToString() != "null")
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
                    discount = Math.Max(total * discountRate, maxDiscount);
                    total -= discount;
                }
                else
                {
                    foreach (var item in cart)
                    {
                        float newPrice = item.price;
                        if ((condition["item"][0].ToString() == "*" && (condition["category"][0].ToString() == "*" || condition["category"].ToObject<List<string>>().Contains(item.categoryid.ToString()))) || condition["item"].ToObject<List<string>>().Contains(item.itemid.ToString()))
                            items.Add(new
                            {
                                item.name,
                                item.quantity,
                                item.primary_img,
                                old_price = item.price,
                                new_price = item.price - Math.Max(item.price * discountRate, maxDiscount)
                            });
                        total += newPrice * item.quantity;
                        discount += Math.Max(newPrice * discountRate, maxDiscount);
                    }
                }
                return new APIRes(200, "Get discount successfully", new { cart = items, discount, total });
            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}