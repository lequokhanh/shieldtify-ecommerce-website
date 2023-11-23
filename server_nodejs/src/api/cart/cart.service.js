const { AppError } = require('../../common/errors/AppError');
const db = require('../../models');

module.exports = {
    getCart: async (client) => {
        try {
            const cart = await db.sequelize.query(
                `
                SELECT it.name, quantity, link as primary_img, it.price, ct.itemid
                FROM cart_items ct
                    JOIN items it ON ct.itemid = it.uid
                    LEFT JOIN item_imgs itm ON it.uid = itm.itemid AND itm.is_primary = 1
                WHERE ct.clientid = :clientid
                `,
                {
                    replacements: {
                        clientid: client,
                    },
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );
            const total = cart.reduce((acc, item) => {
                return acc + item.price * item.quantity;
            }, 0);
            return {
                statusCode: 200,
                message: 'Get cart successfully',
                data: { cart, total },
            };
        } catch (err) {
            throw new AppError(err.statusCode, err.message);
        }
    },
    updateCart: async (client, item, quantity) => {
        try {
            const cartItem = await db.cart_item.findOne({
                where: {
                    clientid: client,
                    itemid: item,
                },
            });
            if (!cartItem) throw new AppError(404, 'Item not found');
            if (quantity < 1)
                await cartItem.destroy({ force: true, truncate: fasle });
            cartItem.quantity = quantity;
            await cartItem.save();
            return {
                statusCode: 200,
                message: 'Update cart successfully',
            };
        } catch (err) {
            throw new AppError(err.statusCode, err.message);
        }
    },
    deleteCartItem: async (client, item) => {
        try {
            const cartItem = await db.cart_item.findOne({
                where: {
                    clientid: client,
                    itemid: item,
                },
            });
            if (cartItem) {
                await cartItem.destroy();
            } else {
                throw new AppError(404, 'Item not found');
            }
            return {
                statusCode: 200,
                message: 'Delete cart item successfully',
            };
        } catch (err) {
            throw new AppError(err.statusCode, err.message);
        }
    },
    deleteCart: async (client) => {
        try {
            await db.cart_item.destroy({
                where: {
                    clientid: client,
                },
            });
            return {
                statusCode: 200,
                message: 'Delete cart successfully',
            };
        } catch (err) {
            throw new AppError(err.statusCode, err.message);
        }
    },
    createCartItem: async (client, item, quantity) => {
        try {
            const itemObj = await db.item.findOne({
                where: {
                    uid: item,
                },
            });
            if (!itemObj) {
                throw new AppError(404, 'Item not found');
            }
            if (quantity < 1) {
                throw new AppError(400, 'Quantity must be greater than 0');
            }
            const cartItem = await db.cart_item.findOne({
                where: {
                    clientid: client,
                    itemid: item,
                },
            });
            if (cartItem) {
                throw new AppError(400, 'Item already exists in cart');
            } else {
                await db.cart_item.create({
                    clientid: client,
                    itemid: item,
                    quantity,
                });
            }
            return {
                statusCode: 200,
                message: 'Create cart item successfully',
            };
        } catch (err) {
            console.log(err);
            throw new AppError(err.statusCode, err.message);
        }
    },
    getDiscount: async (client, code) => {
        try {
            const promotion = await db.promotion.findOne({
                where: {
                    code,
                },
            });
            if (!promotion) throw new AppError(404, 'Promotion not found');
            const cart = await db.sequelize.query(
                `
                SELECT it.name, quantity, link as primary_img, it.price, ct.itemid, categoryid
                FROM cart_items ct
                    JOIN items it ON ct.itemid = it.uid
                    LEFT JOIN item_imgs itm ON it.uid = itm.itemid AND itm.is_primary = 1
                WHERE ct.clientid = :clientid
                `,
                {
                    replacements: {
                        clientid: client,
                    },
                    type: db.sequelize.QueryTypes.SELECT,
                },
            );
            const condition = JSON.parse(promotion.condition);
            const discount_rate = promotion.discount_rate;
            const max_discount = promotion.max_discount;
            let total = 0;
            let discount = 0;
            if (condition.total != 'null') {
                cart.dataValues.forEach((item) => {
                    item.old_price = item.price;
                    item.new_price = item.price;
                    delete item.price;
                    total += item.new_price * item.quantity;
                });
                discount = max(total * discount_rate, max_discount);
                total -= discount;
            } else {
                cart.dataValues.forEach((item) => {
                    item.old_price = item.price;
                    if (
                        (condition.item[0] === '*' &&
                            (condition.category[0] === '*' ||
                                condition.category.includes(
                                    item.categoryid,
                                ))) ||
                        condition.item.includes(item.itemid)
                    ) {
                        item.new_price =
                            item.price -
                            max(item.price * discount_rate, max_discount);
                    } else {
                        item.new_price = item.price;
                    }
                    delete item.price;
                    discount +=
                        item.old_price * item.quantity -
                        item.new_price * item.quantity;
                    total += item.new_price * item.quantity;
                });
            }
            delete cart.dataValues.categoryid;
            return {
                statusCode: 200,
                message: 'Get discount successfully',
                data: {
                    cart,
                    discount,
                    total,
                },
            };
        } catch (err) {
            throw new AppError(err.statusCode, err.message);
        }
    },
};
