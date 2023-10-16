// Promotion_item (promotionID, itemID)

module.exports = (sequelize, Sequelize) => {
    class PromotionItem extends Sequelize.Model {}

    PromotionItem.init(
        {
            promotionid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            itemid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: 'promotion_item',
            timestamps: true,
            paranoid: true,
            underscored: true,
        },
    );

    PromotionItem.associate = (models) => {
        PromotionItem.belongsTo(models.item, {
            foreignKey: 'itemid',
        });
        PromotionItem.belongsTo(models.promotion, {
            foreignKey: 'promotionid',
        });
    };

    return PromotionItem;
};
