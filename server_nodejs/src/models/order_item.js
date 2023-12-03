// Order_item (itemID, orderID, quantity, sales_price)

module.exports = (sequelize, Sequelize) => {
    class OrderItem extends Sequelize.Model {}

    OrderItem.init(
        {
            itemid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            orderid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            sales_price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'order_item',
            timestamps: true,
            paranoid: false,
            underscored: true,
        },
    );

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.item, {
            foreignKey: 'itemid',
        });
        OrderItem.belongsTo(models.order, {
            foreignKey: 'orderid',
        });
    };

    return OrderItem;
};
