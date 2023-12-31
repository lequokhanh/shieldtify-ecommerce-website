module.exports = (sequelize, Sequelize) => {
    class Item extends Sequelize.Model {}

    Item.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            categoryid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            brandid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            specification: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            stock_qty: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'item',
            timestamps: true,
            paranoid: false,
            underscored: true,
        },
    );

    Item.associate = (models) => {
        Item.belongsTo(models.item_category, {
            foreignKey: 'categoryid',
        });
        Item.belongsTo(models.brand, {
            foreignKey: 'brandid',
        });
        Item.hasMany(models.cart_item, {
            foreignKey: 'itemid',
        });
        Item.hasMany(models.item_img, {
            foreignKey: 'itemid',
            as: 'item_img',
        });
        Item.hasMany(models.order_item, {
            foreignKey: 'itemid',
        });
    };
    return Item;
};
