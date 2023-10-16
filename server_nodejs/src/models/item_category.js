// Item_category (UID, name, description)
module.exports = (sequelize, Sequelize) => {
    class Item_category extends Sequelize.Model {}

    Item_category.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'item_category',
            timestamps: true,
            paranoid: true,
            underscored: true,
        },
    );

    Item_category.associate = (models) => {
        Item_category.hasMany(models.item, {
            foreignKey: 'categoryid',
            as: 'item',
        });
    };
    return Item_category;
};
