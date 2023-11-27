// Account (UID, username, password, display_name, role)
module.exports = (sequelize, Sequelize) => {
    class Account extends Sequelize.Model {}

    Account.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            display_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            changed_password_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'account',
            timestamps: true,
            paranoid: false,
            underscored: true,
        },
    );

    Account.associate = (models) => {
        Account.hasMany(models.conversation, {
            foreignKey: 'staffid',
            as: 'conversation',
        });
        Account.hasMany(models.order, {
            foreignKey: 'supported_by',
            as: 'order',
        });
    };
    return Account;
};
