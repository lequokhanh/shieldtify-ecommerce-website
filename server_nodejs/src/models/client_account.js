// Client account (UID, username, password, display_name, email)
module.exports = (sequelize, Sequelize) => {
    class ClientAccount extends Sequelize.Model {}

    ClientAccount.init(
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
            email: {
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
            modelName: 'client_account',
            timestamps: true,
            paranoid: false,
            underscored: true,
        },
    );

    ClientAccount.associate = (models) => {
        ClientAccount.hasMany(models.post, {
            foreignKey: 'created_by',
            as: 'posts',
        });
        ClientAccount.hasMany(models.cart_item, {
            foreignKey: 'clientid',
            as: 'cart_item',
        });
        ClientAccount.hasMany(models.client_address, {
            foreignKey: 'clientid',
            as: 'client_address',
        });
        ClientAccount.hasMany(models.conversation, {
            foreignKey: 'clientid',
            as: 'conversation',
        });
        ClientAccount.hasMany(models.order, {
            foreignKey: 'clientid',
            as: 'order',
        });
        ClientAccount.hasMany(models.vote, {
            foreignKey: 'clientid',
            as: 'vote',
        });
    };
    return ClientAccount;
};
