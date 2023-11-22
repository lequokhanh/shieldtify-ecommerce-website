using shieldtify.common;
using shieldtify.models;
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
                return new APIRes(200, "Get cart successfully", cart);
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
    }
}