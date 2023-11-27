'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('promotions', 'code', {
            type: Sequelize.STRING,
            primaryKey: true,
            references: {
                model: 'orders',
                key: 'promotion_code',
            },
        });
        await queryInterface.changeColumn('orders', 'promotion_code', {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'promotions',
                key: 'code',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('promotions', 'code', {
            type: Sequelize.STRING,
            primaryKey: true,
        });
        await queryInterface.changeColumn('orders', 'promotion_code', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },
};
