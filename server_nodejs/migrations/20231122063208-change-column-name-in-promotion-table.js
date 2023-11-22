'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('promotions', 'name');
        await queryInterface.removeColumn('promotions', 'uid');
        await queryInterface.addColumn('promotions', 'code', {
            type: Sequelize.STRING,
            primaryKey: true,
        });
        await queryInterface.addColumn('promotions', 'max_discount', {
            type: Sequelize.FLOAT,
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('promotions', 'code');
        await queryInterface.removeColumn('promotions', 'max_discount');
        await queryInterface.addColumn('promotions', 'name', {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.addColumn('promotions', 'uid', {
            type: Sequelize.UUID,
            primaryKey: true,
        });
    },
};
