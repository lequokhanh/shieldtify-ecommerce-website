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
            const itemOutOfStock = [];
            for (const item of cart) {
                const itemObj = await db.item.findOne({
                    where: {
                        uid: item.itemid,
                    },
                });
                if (itemObj.stock_qty - item.quantity < 0) {
                    cart.splice(cart.indexOf(item), 1);
                    itemOutOfStock.push(item);
                }
            }
            const total = cart.reduce((acc, item) => {
                return acc + item.price * item.quantity;
            }, 0);
            return {
                statusCode: 200,
                message: 'Get cart successfully',
                data: {
                    cart,
                    total: Math.round(total, 2),
                    out_of_stock: itemOutOfStock,
                },
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
            if (quantity < 1) await cartItem.destroy();
            else {
                const itemObj = await db.item.findOne({
                    where: {
                        uid: item,
                    },
                });
                if (itemObj.stock_qty - quantity < 0) {
                    if (itemObj.stock_qty > 0)
                        cartItem.quantity = itemObj.stock_qty;
                    else await cartItem.destroy();
                }
                cartItem.quantity = quantity;
            }
            await cartItem.save();
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
            const itemOutOfStock = [];
            for (const item of cart) {
                const itemObj = await db.item.findOne({
                    where: {
                        uid: item.itemid,
                    },
                });
                if (itemObj.stock_qty - item.quantity < 0) {
                    cart.splice(cart.indexOf(item), 1);
                    itemOutOfStock.push(item);
                }
            }
            const total = cart.reduce((acc, item) => {
                return acc + item.price * item.quantity;
            }, 0);
            return {
                statusCode: 200,
                message: 'Update cart successfully',
                data: {
                    cart,
                    total: Math.round(total, 2),
                    out_of_stock: itemOutOfStock,
                },
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
    createCartItem: async (client, items) => {
        try {
            let error = [];
            for (const item of items) {
                const itemObj = await db.item.findOne({
                    where: {
                        uid: item.item,
                    },
                });
                if (item.quantity < 1)
                    error.push({
                        itemid: item.uid,
                        message: 'Quantity must be greater than 0',
                    });
                if (!itemObj)
                    error.push({
                        itemid: item.uid,
                        message: 'Item not found',
                    });
                const cartItem = await db.cart_item.findOne({
                    where: {
                        clientid: client,
                        itemid: item.item,
                    },
                });
                if (cartItem) {
                    if (
                        itemObj.stock_qty - cartItem.quantity - item.quantity <
                        0
                    )
                        error.push({
                            itemid: item.uid,
                            message: 'Quantity is greater than stock quantity',
                        });
                    else {
                        cartItem.quantity += item.quantity;
                        await cartItem.save();
                    }
                } else {
                    await db.cart_item.create({
                        clientid: client,
                        itemid: item.item,
                        quantity: item.quantity,
                    });
                }
            }
            return {
                statusCode: 200,
                message: 'Create cart item successfully',
                data: error,
            };
        } catch (err) {
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
            if (!cart.length) throw new AppError(400, 'Cart is empty');
            const itemOutOfStock = [];
            for (const item of cart) {
                const itemObj = await db.item.findOne({
                    where: {
                        uid: item.itemid,
                    },
                });
                if (itemObj.stock_qty - item.quantity < 0) {
                    cart.splice(cart.indexOf(item), 1);
                    itemOutOfStock.push(item);
                }
            }
            const condition = JSON.parse(promotion.condition);
            const discount_rate = promotion.discount_rate;
            const max_discount = promotion.max_discount;
            const type = promotion.type;
            let total = 0;
            let discount = 0;
            if (type === 'by total') {
                cart.dataValues.forEach((item) => {
                    item.old_price = item.price;
                    item.new_price = item.price;
                    delete item.price;
                    total += item.new_price * item.quantity;
                });
                if (condition.total <= total)
                    throw new AppError(400, 'Total is not enough get discount');
                discount = max(total * discount_rate, max_discount);
                total -= discount;
            } else {
                let flag = false;
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
                        flag = true;
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
                if (!flag)
                    throw new AppError(
                        400,
                        'No item in cart is eligible for discount',
                    );
            }
            delete cart.dataValues.categoryid;
            return {
                statusCode: 200,
                message: 'Get discount successfully',
                data: {
                    cart,
                    discount: Math.round(discount, 2),
                    total: Math.round(total, 2),
                    out_of_stock: itemOutOfStock,
                },
            };
        } catch (err) {
            throw new AppError(err.statusCode, err.message);
        }
    },
};
