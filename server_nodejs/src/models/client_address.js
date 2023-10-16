// Client address (UID, clientID, address, city, province, phone_number)
module.exports = (sequelize, Sequelize) => {
    class ClientAddress extends Sequelize.Model {}

    ClientAddress.init(
        {
            uid: {
                type: Sequelize.UUID,
                primaryKey: true,
            },
            clientid: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            province: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'client_address',
            timestamps: true,
            paranoid: true,
            underscored: true,
        },
    );

    ClientAddress.associate = (models) => {
        ClientAddress.belongsTo(models.client_account, {
            foreignKey: 'clientid',
        });
        ClientAddress.hasMany(models.order, {
            foreignKey: 'shipping_addressid',
            as: 'order',
        });
    };

    return ClientAddress;
};
