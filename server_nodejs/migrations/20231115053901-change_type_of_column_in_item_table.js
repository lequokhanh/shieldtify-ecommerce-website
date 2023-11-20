'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('items', 'specification', {
            type: Sequelize.TEXT('long'),
            allowNull: false,
        });
        await queryInterface.changeColumn('items', 'description', {
            type: Sequelize.TEXT('long'),
            allowNull: false,
        });
        await queryInterface.changeColumn('items', 'price', {
            type: Sequelize.FLOAT,
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('items', 'specification', {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.changeColumn('items', 'description', {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.changeColumn('items', 'price', {
            type: Sequelize.INTEGER,
            allowNull: false,
        });
    },
};
