const { AppError } = require('../../common/errors/AppError');
const db = require('../../models');

module.exports = {
    getAllProduct: async (keyword, page, sort, priceRange, brandsFilter) => {
        try {
            var query = `FROM items it
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
            const totalItem = (
                await db.sequelize.query({
                    query: `SELECT COUNT(*) cnt ${query}`,
                    type: db.Sequelize.QueryTypes.SELECT,
                })
            )[0][0].cnt;
            if (sort === 'popular')
                query +=
                    ' GROUP BY it.uid, name, price, link ORDER BY COUNT(oi.itemid) DESC';
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
                WHERE lower(name) LIKE '%${keyword.toLowerCase()}%'`,
                {
                    type: db.Sequelize.QueryTypes.SELECT,
                },
            );
            const brands = (
                await db.sequelize.query(
                    `SELECT DISTINCT br.name
                FROM items it
                    LEFT JOIN brands br ON it.brandid = br.uid
                WHERE lower(it.name) LIKE '%${keyword.toLowerCase()}%'`,
                    {
                        type: db.Sequelize.QueryTypes.SELECT,
                    },
                )
            ).map((brand) => brand.name);
            return {
                statusCode: 200,
                message: 'Get all product successfully',
                data: {
                    items,
                    totalItem,
                    maxPrice: Math.ceil(maxPrice[0].max),
                    brands,
                },
            };
        } catch (error) {
            console.log(error);
            throw new AppError(error.statusCode, error.message);
        }
    },
    getAllCategory: async () => {
        try {
            const categories = await db.item_category.findAll({
                attributes: ['uid', 'name'],
            });
            return {
                statusCode: 200,
                message: 'Get all category successfully',
                data: categories,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    getAllProductByCategory: async (
        category,
        page,
        sort,
        priceRange,
        brandsFilter,
        keyword,
    ) => {
        try {
            var description;
            if (!category.match(/^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i)) {
                const categoryObj = await db.sequelize.query(
                    `SELECT uid, description FROM item_categories WHERE lower(name) like '${category.toLowerCase()}'`,
                    {
                        type: db.Sequelize.QueryTypes.SELECT,
                    },
                );
                if (!categoryObj.length)
                    throw new AppError(404, 'Category not found');
                category = categoryObj[0].uid;
                description = categoryObj[0].description;
            }
            var query = `FROM items it
                    LEFT JOIN item_imgs im ON it.uid = im.itemid AND im.is_primary = 1
                    LEFT JOIN order_items oi ON it.uid = oi.itemid
                WHERE categoryid = '${category}' AND lower(name) LIKE '%${keyword.toLowerCase()}%'`;
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
            const totalItem = await db.sequelize.query({
                query: `SELECT COUNT(*) cnt ${query}`,
                type: db.Sequelize.QueryTypes.SELECT,
            });
            if (sort === 'popular')
                query +=
                    ' GROUP BY it.uid, name, price, link ORDER BY COUNT(oi.itemid) DESC';
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
                WHERE categoryid = '${category}' AND lower(name) LIKE '%${keyword.toLowerCase()}%'`,
                {
                    type: db.Sequelize.QueryTypes.SELECT,
                },
            );
            const brands = (
                await db.sequelize.query(
                    `SELECT DISTINCT br.name
                FROM items it
                    LEFT JOIN brands br ON it.brandid = br.uid
                WHERE categoryid = '${category}' AND lower(it.name) LIKE '%${keyword.toLowerCase()}%'`,
                    {
                        type: db.Sequelize.QueryTypes.SELECT,
                    },
                )
            ).map((brand) => brand.name);

            return {
                statusCode: 200,
                message: 'Get all product by category successfully',
                data: {
                    description,
                    items,
                    totalItem: totalItem[0][0].cnt,
                    maxPrice: Math.ceil(maxPrice[0].max),
                    brands,
                },
            };
        } catch (error) {
            console.log(error);
            throw new AppError(error.statusCode, error.message);
        }
    },
    getProductDetail: async (product) => {
        try {
            if (!product.match(/^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i)) {
                throw new AppError(400, 'Invalid product id');
            }
            const item = await db.item.findByPk(product, {
                include: [
                    {
                        model: db.item_img,
                        as: 'item_img',
                        attributes: ['link', 'is_primary'],
                    },
                    {
                        model: db.brand,
                        attributes: ['name'],
                    },
                ],
            });
            if (!item) throw new AppError(404, 'Product not found');
            item.dataValues.imgs = item.dataValues.item_img;
            delete item.dataValues.item_img;
            return {
                statusCode: 200,
                message: 'Get product detail successfully',
                data: item,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
};
