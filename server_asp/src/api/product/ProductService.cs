using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using shieldtify.common;
using shieldtify.models;
using BC = BCrypt.Net.BCrypt;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
namespace shieldtify.api.product
{
    public static class ProductService
    {
        public static APIRes getAllProduct(int page = 1, string sort = "popular", string priceRange = "", string brandsFilter = "", string keyword = "")
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var query = dbContext.Items.Where(i => i.Name.ToLower().Contains(keyword.ToLower()));
                if (priceRange != "")
                {
                    var priceRangeArr = priceRange.Split('-');
                    query = query.Where(i => i.Price >= int.Parse(priceRangeArr[0]) && i.Price <= int.Parse(priceRangeArr[1]));
                }
                if (brandsFilter != "")
                {
                    var brandsArr = brandsFilter.Split(',');
                    query = query.Where(i => brandsArr.Contains(i.Brand.Name));
                }
                if (sort == "popular")
                {
                    query = query.OrderByDescending(i => i.OrderItems.Count());
                }
                else
                {
                    var sortField = sort.Split('-')[0];
                    var sortOrder = sort.Split('-')[1];
                    if (sortField == "price")
                    {
                        query = sortOrder == "asc" ? query.OrderBy(i => i.Price) : query.OrderByDescending(i => i.Price);
                    }
                    else if (sortField == "name")
                    {
                        query = sortOrder == "asc" ? query.OrderBy(i => i.Name) : query.OrderByDescending(i => i.Name);
                    }
                }
                var products = query.Select(i => new
                {
                    uid = i.Uid,
                    name = i.Name,
                    price = i.Price,
                    primary_img = i.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault(),
                    stock_qty = i.StockQty,
                    brand = i.Brand.Name
                }).Skip((page - 1) * 16).Take(16).ToList();
                // round up max price
                var maxPrice = (int)Math.Ceiling(dbContext.Items.Where(i => i.Name.ToLower().Contains(keyword.ToLower())).Max(i => i.Price));
                var brands = dbContext.Items.Where(i => i.Name.ToLower().Contains(keyword.ToLower())).Select(i => i.Brand.Name).Distinct().ToList();
                var totalItem = query.Count();
                return new APIRes(200, "Get all product successfully", new
                {
                    items = products,
                    totalItem,
                    maxPrice,
                    brands
                });
            }
            catch (System.Exception)
            {
                throw;
            }
        }
        public static APIRes getAllCategory()
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var categories = dbContext.ItemCategories.Select(c => new
                {
                    uid = c.Uid,
                    name = c.Name,
                    description = c.Description
                }).ToList();
                return new APIRes(200, "Get all category successfully", categories);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes getAllProductByCategory(string category, int page = 1, string sort = "popular", string priceRange = "", string brandsFilter = "", string keyword = "")
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var description = "";
                if (!Guid.TryParse(category, out Guid id))
                {
                    var categoryObj = dbContext.ItemCategories.FirstOrDefault(c => c.Name == category);
                    if (categoryObj == null)
                    {
                        return new APIRes(404, "Category not found");
                    }
                    category = categoryObj.Uid.ToString();
                    description = categoryObj.Description;
                }
                var query = dbContext.Items.Where(i => i.Categoryid.ToString() == category && i.Name.ToLower().Contains(keyword.ToLower()));
                if (priceRange != "")
                {
                    var priceRangeArr = priceRange.Split('-');
                    query = query.Where(i => i.Price >= int.Parse(priceRangeArr[0]) && i.Price <= int.Parse(priceRangeArr[1]));
                }
                if (brandsFilter != "")
                {
                    var brandsArr = brandsFilter.Split(',');
                    query = query.Where(i => brandsArr.Contains(i.Brand.Name));
                }
                if (sort == "popular")
                {
                    query = query.OrderByDescending(i => i.OrderItems.Count());
                }
                else
                {
                    var sortField = sort.Split('-')[0];
                    var sortOrder = sort.Split('-')[1];
                    if (sortField == "price")
                    {
                        query = sortOrder == "asc" ? query.OrderBy(i => i.Price) : query.OrderByDescending(i => i.Price);
                    }
                    else if (sortField == "name")
                    {
                        query = sortOrder == "asc" ? query.OrderBy(i => i.Name) : query.OrderByDescending(i => i.Name);
                    }
                }
                var products = query.Select(i => new
                {
                    uid = i.Uid,
                    name = i.Name,
                    price = i.Price,
                    primary_img = i.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault(),
                    brand = i.Brand.Name,
                    stock_qty = i.StockQty
                }).Skip((page - 1) * 16).Take(16).ToList();
                // round up max price
                var maxPrice = (int)Math.Ceiling(dbContext.Items.Where(i => i.Categoryid.ToString() == category).Max(i => i.Price));
                var brands = dbContext.Items.Where(i => i.Categoryid.ToString() == category).Select(i => i.Brand.Name).Distinct().ToList();
                var totalItem = query.Count();
                return new APIRes(200, "Get all product by category successfully", new
                {
                    description,
                    items = products,
                    totalItem,
                    maxPrice,
                    brands
                });
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes getProductDetail(string id)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                // check id is uuid
                if (!Guid.TryParse(id, out Guid uid))
                {
                    return new APIRes(400, "Invalid product id");
                }
                var item = dbContext.Items.Where(i => i.Uid == uid)
                    .Select(i => new
                    {
                        uid = i.Uid,
                        name = i.Name,
                        price = i.Price,
                        description = i.Description,
                        specification = i.Specification,
                        imgs = i.ItemImgs.Select(im => new
                        {
                            link = im.Link,
                            is_primary = im.IsPrimary
                        }).ToList(),
                        brand = new { name = i.Brand.Name },
                        item_category = new { name = i.Category.Name },
                        stock_qty = i.StockQty
                    })
                    .FirstOrDefault();
                if (item == null)
                    return new APIRes(404, "Product not found");
                return new APIRes(200, "Get product detail successfully", item);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes createProduct(CreateProductBody body)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var item = new Item
                {
                    Uid = Guid.NewGuid(),
                    Categoryid = Guid.Parse(body.categoryid),
                    Brandid = Guid.Parse(body.brandid),
                    Name = body.name,
                    Specification = body.specification,
                    Description = body.description,
                    Price = body.price,
                    StockQty = body.stock_qty
                };
                dbContext.Items.Add(item);
                dbContext.SaveChanges();
                return new APIRes(200, "Create product successfully", item);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes updateProduct(string uid, UpdateProductBody body)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var item = dbContext.Items.FirstOrDefault(i => i.Uid.ToString() == uid);
                if (item == null)
                    return new APIRes(404, "Product not found");
                item.Categoryid = body.categoryid != null ? Guid.Parse(body.categoryid) : item.Categoryid;
                item.Brandid = body.brandid != null ? Guid.Parse(body.brandid) : item.Brandid;
                item.Name = body.name != null ? body.name : item.Name;
                item.Specification = body.specification != null ? body.specification : item.Specification;
                item.Description = body.description != null ? body.description : item.Description;
                item.Price = body.price ?? item.Price;
                item.StockQty = (int)(body.stock_qty != null ? body.stock_qty : item.StockQty);
                dbContext.SaveChanges();
                return new APIRes(200, "Update product successfully", item);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes getAllBrand()
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var brands = dbContext.Brands.Select(b => new
                {
                    uid = b.Uid,
                    name = b.Name
                }).ToList();
                return new APIRes(200, "Get all brand successfully", brands);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes createBrand(CreateBrandBody body)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var brand = new Brand
                {
                    Uid = Guid.NewGuid(),
                    Name = body.name
                };
                dbContext.Brands.Add(brand);
                dbContext.SaveChanges();
                return new APIRes(200, "Create brand successfully", brand);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes addImagesToProduct(string itemid, AddImagesToProductBody body)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var item = dbContext.Items.FirstOrDefault(i => i.Uid.ToString() == itemid);
                if (item == null)
                    return new APIRes(404, "Product not found");
                foreach (var img in body.imgs)
                {
                    var itemImg = new ItemImg
                    {
                        Uid = Guid.NewGuid(),
                        Itemid = Guid.Parse(itemid),
                        Link = img.link,
                        IsPrimary = img.isPrimary
                    };
                    dbContext.ItemImgs.Add(itemImg);
                }
                dbContext.SaveChanges();
                return new APIRes(200, "Add images to product successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes deleteImageFromProduct(string itemid, string uid)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var item = dbContext.Items.FirstOrDefault(i => i.Uid.ToString() == itemid);
                if (item == null)
                    return new APIRes(404, "Product not found");
                var img = dbContext.ItemImgs.FirstOrDefault(im => im.Uid.ToString() == uid);
                if (img == null)
                    return new APIRes(404, "Image not found");
                if (img.Itemid.ToString() != itemid)
                    return new APIRes(400, "Image not belong to product");
                if (img.IsPrimary)
                    return new APIRes(400, "Choose another primary image first to delete this image");
                dbContext.ItemImgs.Remove(img);
                dbContext.SaveChanges();
                return new APIRes(200, "Delete image from product successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes setDefaultImage(string itemid, string uid)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var item = dbContext.Items.FirstOrDefault(i => i.Uid.ToString() == itemid);
                if (item == null)
                    return new APIRes(404, "Product not found");
                var img = dbContext.ItemImgs.FirstOrDefault(im => im.Uid.ToString() == uid);
                if (img == null)
                    return new APIRes(404, "Image not found");
                if (img.Itemid.ToString() != itemid)
                    return new APIRes(400, "Image not belong to product");
                var primaryImg = dbContext.ItemImgs.FirstOrDefault(im => im.Itemid.ToString() == itemid && im.IsPrimary);
                if (primaryImg != null)
                {
                    primaryImg.IsPrimary = false;
                    dbContext.SaveChanges();
                }
                img.IsPrimary = true;
                dbContext.SaveChanges();
                return new APIRes(200, "Set primary image successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes createCategory(CreateCategoryBody body)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var category = new ItemCategory
                {
                    Uid = Guid.NewGuid(),
                    Name = body.name,
                    Description = body.description
                };
                dbContext.ItemCategories.Add(category);
                dbContext.SaveChanges();
                return new APIRes(200, "Create category successfully", category);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static APIRes updateCategory(string uid, UpdateCategoryBody body)
        {
            try
            {
                using var dbContext = new ShieldtifyContext();
                var category = dbContext.ItemCategories.FirstOrDefault(c => c.Uid.ToString() == uid);
                if (category == null)
                    return new APIRes(404, "Category not found");
                category.Name = body.name ?? category.Name;
                category.Description = body.description ?? category.Description;
                dbContext.SaveChanges();
                return new APIRes(200, "Update category successfully", category);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}