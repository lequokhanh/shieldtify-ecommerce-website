// Promotion (UID, name, description, discount_rate, start_date, end_date)

module.exports = (sequelize, Sequelize) => {
    class Promotion extends Sequelize.Model {}

    Promotion.init(
        {
            code: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                //enum: ['by total', 'by item'],
                type: Sequelize.STRING,
                allowNull: false,
            },
            condition: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            discount_rate: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            max_discount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'promotion',
            timestamps: true,
            paranoid: false,
            underscored: true,
        },
    );

    Promotion.associate = (models) => {
        Promotion.hasMany(models.order, {
            foreignKey: 'promotion_code',
        });
    };

    return Promotion;
};
