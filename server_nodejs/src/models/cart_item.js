// Cart_ item (clientID, itemID, quantity)
module.exports = (sequelize, Sequelize) => {
    class CartItem extends Sequelize.Model {}

    CartItem.init(
        {
            clientid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            itemid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'cart_item',
            timestamps: true,
            paranoid: false,
            underscored: true,
        },
    );

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.item, {
            foreignKey: 'itemid',
        });
        CartItem.belongsTo(models.client_account, {
            foreignKey: 'clientid',
        });
    };

    return CartItem;
};
