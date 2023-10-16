//Item_img (UID, itemID, link, is_primary)

module.exports = (sequelize, Sequelize) => {
    class ItemImage extends Sequelize.Model {}

    ItemImage.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            itemid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            link: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            is_primary: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'item_img',
            timestamps: true,
            paranoid: true,
            underscored: true,
        },
    );

    ItemImage.associate = (models) => {
        ItemImage.belongsTo(models.item, {
            foreignKey: 'itemid',
        });
    };
    return ItemImage;
};
