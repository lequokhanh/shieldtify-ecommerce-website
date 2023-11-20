'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('client_addresses', 'is_default', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('client_addresses', 'is_default');
    },
};
