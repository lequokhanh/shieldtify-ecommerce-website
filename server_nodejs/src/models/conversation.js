// Conversation (UID, clientID, staffID)
module.exports = (sequelize, Sequelize) => {
    class Conversation extends Sequelize.Model {}

    Conversation.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            clientid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            staffid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'conversation',
            timestamps: true,
            paranoid: false,
            underscored: true,
        },
    );

    Conversation.associate = (models) => {
        Conversation.belongsTo(models.client_account, {
            foreignKey: 'clientid',
        });
        Conversation.belongsTo(models.account, {
            foreignKey: 'staffid',
        });
        Conversation.hasMany(models.message, {
            foreignKey: 'conversationid',
            as: 'message',
        });
    };

    return Conversation;
};
