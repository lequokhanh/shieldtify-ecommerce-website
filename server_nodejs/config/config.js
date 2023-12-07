const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        logging: false,
        timezone: '+07:00',
        host: process.env.DB_HOST,
        dialect: 'mysql',
        define: {
            charset: 'utf8mb4',
            dialectOptions: { collate: 'utf8mb4_unicode_ci' },
        },
    },
    test: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
    production: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
};
