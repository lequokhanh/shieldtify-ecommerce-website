'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('accounts', [
            {
                uid: '4afa1cb4-73bc-4fe6-a47d-f9e58d413194', // Generate a UUID for the account
                username: 'admin',
                password:
                    '$2b$10$pOU2IRaEPz29r9AjMSak2u96mROCZd4bIqWFlcwCJ40u7J/NYWz6S', // Hashed password
                display_name: 'Super Admin User',
                role: 'superadmin',
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
