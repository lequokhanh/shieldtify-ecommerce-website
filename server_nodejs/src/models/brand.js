// Brand (UID, name, image)
module.exports = (sequelize, Sequelize) => {
    class Brand extends Sequelize.Model {}

    Brand.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'brand',
            timestamps: true,
            paranoid: true,
            underscored: true,
        },
    );

    Brand.associate = (models) => {
        Brand.hasMany(models.item, {
            foreignKey: 'brandid',
            as: 'item',
        });
    };

    return Brand;
};
