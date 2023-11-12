'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('promotions', 'condition', {
            type: Sequelize.TEXT('long'),
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('promotions', 'condition', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },
};
