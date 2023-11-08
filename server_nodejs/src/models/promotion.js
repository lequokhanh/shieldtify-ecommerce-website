// Promotion (UID, name, description, discount_rate, start_date, end_date)

module.exports = (sequelize, Sequelize) => {
    class Promotion extends Sequelize.Model {}

    Promotion.init(
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
            condition: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            discount_rate: {
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
            paranoid: true,
            underscored: true,
        },
    );
    return Promotion;
};
