// Message (UID, conversationID, content, role)

module.exports = (sequelize, Sequelize) => {
    class Message extends Sequelize.Model {}

    Message.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            conversationid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            index: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'message',
            timestamps: true,
            paranoid: false,
            underscored: true,
        },
    );

    Message.associate = (models) => {
        Message.belongsTo(models.conversation, {
            foreignKey: 'conversationid',
        });
    };
    return Message;
};
