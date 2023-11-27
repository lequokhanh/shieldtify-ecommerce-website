'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('orders', 'promotion_code', {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.removeColumn('orders', 'order_total');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('orders', 'promotion_code');
        await queryInterface.addColumn('orders', 'order_total', {
            type: Sequelize.FLOAT,
            allowNull: false,
        });
    },
};
