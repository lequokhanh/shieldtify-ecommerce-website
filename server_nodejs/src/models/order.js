// Order (UID, clientID, payment_method, receive_method, shipping_addressID, order_date, order_total, order_status, supported_by)

module.exports = (sequelize, Sequelize) => {
    class Order extends Sequelize.Model {}

    Order.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            clientid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            payment_method: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            receive_method: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            shipping_addressid: {
                type: Sequelize.UUID,
                allowNull: true,
            },
            order_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            promotion_code: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            order_status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            supported_by: {
                type: Sequelize.UUID,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'order',
            timestamps: true,
            paranoid: false,
            underscored: true,
        },
    );

    Order.associate = (models) => {
        Order.belongsTo(models.client_account, {
            foreignKey: 'clientid',
            as: 'client',
        });
        Order.belongsTo(models.client_address, {
            foreignKey: 'shipping_addressid',
            as: 'shipping_address',
        });
        Order.belongsTo(models.account, {
            foreignKey: 'supported_by',
            as: 'staff',
        });
        Order.hasMany(models.order_item, {
            foreignKey: 'orderid',
            as: 'order_item',
        });
        Order.belongsTo(models.promotion, {
            foreignKey: 'promotion_code',
        });
    };

    return Order;
};
