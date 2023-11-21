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
                /*var query = `FROM items it
                    LEFT JOIN item_imgs im ON it.uid = im.itemid AND im.is_primary = 1
                    LEFT JOIN order_items oi ON it.uid = oi.itemid
                WHERE lower(name) LIKE '%${keyword.toLowerCase()}%'`;
            if (priceRange) {
                query += ` AND price BETWEEN ${priceRange.split('-')[0]} AND ${
                    priceRange.split('-')[1]
                }`;
            }
            if (brandsFilter) {
                query += ` AND brandid IN (SELECT uid FROM brands WHERE name IN ('${brandsFilter
                    .split(',')
                    .join("','")}'))`;
            }
            if (sort === 'popular')
                query +=
                    ' GROUP BY it.uid, name, price, primary_img ORDER BY COUNT(oi.itemid) DESC';
            else {
                sortField = sort.split('-')[0];
                sortOrder = sort.split('-')[1];
                if (sortField === 'price') {
                    query += ` ORDER BY price ${sortOrder}`;
                } else if (sortField === 'name') {
                    query += ` ORDER BY name ${sortOrder}`;
                }
            }
            const items = await db.sequelize.query(
                `SELECT it.uid, name, price, link primary_img
                ${query}
                LIMIT 16
                OFFSET ${(page - 1) * 16};`,
                {
                    type: db.Sequelize.QueryTypes.SELECT,
                },
            );
            const maxPrice = await db.sequelize.query(
                `SELECT MAX(price) max
                FROM items
                WHERE lower(name) LIKE '%${keyword.toLowerCase()}%';`,
                {
                    type: db.Sequelize.QueryTypes.SELECT,
                },
            );
            const brands = (
                await db.sequelize.query(
                    `SELECT DISTINCT br.name
                FROM items it
                    LEFT JOIN brands br ON it.brandid = br.uid
                WHERE lower(it.name) LIKE '%${keyword.toLowerCase()}%';`,
                    {
                        type: db.Sequelize.QueryTypes.SELECT,
                    },
                )
            ).map((brand) => brand.name);

            const totalPage = Math.ceil(
                (
                    await db.sequelize.query({
                        query: `SELECT COUNT(*) cnt ${query}`,
                        type: db.Sequelize.QueryTypes.SELECT,
                    })
                )[0][0].cnt / 16,
            );
            return {
                statusCode: 200,
                message: 'Get all product by category successfully',
                data: {
                    items,
                    totalPage,
                    maxPrice: Math.ceil(maxPrice[0].max),
                    brands,
                },
            };*/
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
                    primary_img = i.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault()
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
                    name = c.Name
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
                    primary_img = i.ItemImgs.Where(im => im.IsPrimary).Select(im => im.Link).FirstOrDefault()
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
                        brand = new { name = i.Brand.Name }
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
    }
}