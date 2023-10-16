module.exports = (sequelize, Sequelize) => {
    class Authenticate extends Sequelize.Model {}

    Authenticate.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            usedTo: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            token: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            isUsed: {
                type: Sequelize.TINYINT(1),
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'authenticate',
            timestamps: true,
            underscored: true,
        },
    );

    return Authenticate;
};
