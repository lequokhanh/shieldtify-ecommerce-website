// Vote (postID, userID, type)

module.exports = (sequelize, Sequelize) => {
    class Vote extends Sequelize.Model {}

    Vote.init(
        {
            postid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            clientid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'vote',
            timestamps: true,
            paranoid: true,
            underscored: true,
        },
    );

    Vote.associate = (models) => {
        Vote.belongsTo(models.post, {
            foreignKey: 'postid',
        });
        Vote.belongsTo(models.client_account, {
            foreignKey: 'clientid',
        });
    };

    return Vote;
};
