const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const db = require('./src/models');
const api = require('./src/api');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
require('./src/common/socket')(server);
const corsOptions = {
    credentials: true,
    origin: process.env.ORIGIN.split(','),
};
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.static('public'));

db.sequelize.sync().then(() => {
    console.log('DB connection success.');
});

app.use('/api', api);

const PORT = process.env.PORT || 3000;
app.use((_req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: 'Not Found',
    });
});

app.use((error, _req, res, _next) => {
    let { statusCode, message } = error;

    statusCode = statusCode ? statusCode : 500;

    res.status(statusCode).json({
        statusCode,
        message,
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${PORT}`);
});
