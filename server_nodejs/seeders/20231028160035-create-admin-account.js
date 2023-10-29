'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('accounts', [
            {
                uid: '4afa1cb4-73bc-4fe6-a47d-f9e58d413194', // Generate a UUID for the account
                username: 'admin',
                password: 'admin', // You should hash the password before inserting it into the database
                display_name: 'Admin User',
                role: 'admin',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        // Remove the admin account when rolling back the seeder
        await queryInterface.bulkDelete('accounts', {
            uid: '4afa1cb4-73bc-4fe6-a47d-f9e58d413194',
        });
    },
};
