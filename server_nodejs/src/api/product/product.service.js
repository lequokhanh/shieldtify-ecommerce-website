const { AppError } = require('../../common/errors/AppError');
const db = require('../../models');
const uuid = require('uuid');

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
                `SELECT distinct it.uid, name, price, link primary_img
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
            throw new AppError(error.statusCode, error.message);
        }
    },
    getAllCategory: async () => {
        try {
            const categories = await db.item_category.findAll({
                attributes: ['uid', 'name', 'description'],
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
                    `SELECT distinct uid, description FROM item_categories WHERE lower(name) like '${category.toLowerCase()}'`,
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
                    LEFT JOIN brands br ON it.brandid = br.uid
                WHERE categoryid = '${category}' AND lower(it.name) LIKE '%${keyword.toLowerCase()}%'`;
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
                    ' GROUP BY it.uid, it.name, price, link ORDER BY COUNT(oi.itemid) DESC';
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
                `SELECT distinct it.uid, it.name, price, link primary_img, stock_qty, br.name as brand
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
                        attributes: ['uid', 'link', 'is_primary'],
                    },
                    {
                        model: db.brand,
                        attributes: ['name'],
                    },
                    {
                        model: db.item_category,
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
    createProduct: async ({
        categoryid,
        brandid,
        name,
        specification,
        description,
        price,
        stock_qty,
    }) => {
        try {
            const item = await db.item.create({
                uid: uuid.v4(),
                categoryid,
                brandid,
                name,
                specification,
                description,
                price,
                stock_qty,
            });
            return {
                statusCode: 200,
                message: 'Create product successfully',
                data: item,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    updateProduct: async (
        uid,
        {
            categoryid,
            brandid,
            name,
            specification,
            description,
            price,
            stock_qty,
        },
    ) => {
        try {
            const item = await db.item.findByPk(uid);
            if (!item) throw new AppError(404, 'Product not found');
            item.categoryid = categoryid != null ? categoryid : item.categoryid;
            item.brandid = brandid != null ? brandid : item.brandid;
            item.name = name != null ? name : item.name;
            item.specification =
                specification != null ? specification : item.specification;
            item.description =
                description != null ? description : item.description;
            item.price = price != null ? price : item.price;
            item.stock_qty = stock_qty != null ? stock_qty : item.stock_qty;
            await item.save();
            return {
                statusCode: 200,
                message: 'Update product successfully',
                data: item,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    getAllBrand: async () => {
        try {
            const brands = await db.brand.findAll({});
            return {
                statusCode: 200,
                message: 'Get all brand successfully',
                data: brands,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    createBrand: async ({ name }) => {
        try {
            const brand = await db.brand.create({
                uid: uuid.v4(),
                name,
            });
            return {
                statusCode: 200,
                message: 'Create brand successfully',
                data: brand,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    addImagesToProduct: async (itemid, { imgs }) => {
        try {
            const item = await db.item.findByPk(itemid);
            if (!item) throw new AppError(404, 'Product not found');
            for (const img of imgs) {
                await db.item_img.create({
                    uid: uuid.v4(),
                    itemid,
                    link: img.link,
                    is_primary: img.is_primary,
                });
            }
            return {
                statusCode: 200,
                message: 'Add images to product successfully',
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    deleteImageFromProduct: async (itemid, uid) => {
        try {
            const item = await db.item.findByPk(itemid);
            if (!item) throw new AppError(404, 'Product not found');
            const img = await db.item_img.findByPk(uid);
            if (img.itemid !== itemid)
                throw new AppError(400, 'Image not belong to product');
            if (img.is_primary)
                throw new AppError(
                    400,
                    'Choose another primary image first to delete this image',
                );
            await img.destroy();
            return {
                statusCode: 200,
                message: 'Delete image from product successfully',
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    setDefaultImage: async (itemid, uid) => {
        try {
            const item = await db.item.findByPk(itemid);
            if (!item) throw new AppError(404, 'Product not found');
            const img = await db.item_img.findByPk(uid);
            if (img.itemid !== itemid)
                throw new AppError(400, 'Image not belong to product');
            const primaryImg = await db.item_img.findOne({
                where: { itemid, is_primary: true },
            });
            if (primaryImg) {
                primaryImg.is_primary = false;
                await primaryImg.save();
            }
            img.is_primary = true;
            await img.save();
            return {
                statusCode: 200,
                message: 'Set primary image successfully',
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    createCategory: async ({ name, description }) => {
        try {
            const category = await db.item_category.create({
                uid: uuid.v4(),
                name,
                description,
            });
            return {
                statusCode: 200,
                message: 'Create category successfully',
                data: category,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    updateCategory: async (uid, { name, description }) => {
        try {
            const category = await db.item_category.findByPk(uid);
            if (!category) throw new AppError(404, 'Category not found');
            category.name = name ? name : category.name;
            category.description = description
                ? description
                : category.description;
            await category.save();
            return {
                statusCode: 200,
                message: 'Update category successfully',
                data: category,
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
};
