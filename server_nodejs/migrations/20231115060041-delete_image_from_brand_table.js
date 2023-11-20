'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('brands', 'image');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('brands', 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
};
