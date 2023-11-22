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
            return {
                statusCode: 200,
                message: 'Get cart successfully',
                data: cart,
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
};
