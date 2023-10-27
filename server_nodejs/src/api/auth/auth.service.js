const db = require('../../models');
const { AppError } = require('../../common/errors/AppError');
const { sendMailForCreatePassword } = require('../../common/email');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
module.exports = {
    existedEmail: async ({ email }) => {
        try {
            const user = await db.client_account.findOne({
                where: {
                    email,
                },
            });
            if (user) throw new AppError(400, 'Email existed');
            return {
                statusCode: 200,
                message: 'Email not existed',
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    sendEmailRegister: async ({ email }) => {
        try {
            const authToken = await db.authenticate.create({
                uid: uuid.v4(),
                usedTo: 'create-account',
                token: uuid.v4(),
            });
            const token = JWT.sign(
                {
                    email,
                    token: authToken.token,
                },
                process.env.JWT_SECRET_KEY
                    ? process.env.JWT_SECRET_KEY
                    : 'default_secret_key',
                {
                    expiresIn: '30m',
                },
            );
            await sendMailForCreatePassword(email, token);
            return {
                statusCode: 200,
                message: 'Send email successfully',
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    register: async (token, { username, password, displayname }) => {
        try {
            var decodeToken = JWT.verify(
                token,
                process.env.JWT_SECRET_KEY
                    ? process.env.JWT_SECRET_KEY
                    : 'default_secret_key',
            );
            if (!decodeToken) {
                throw new AppError(400, 'Token is invalid');
            }
            const authToken = await db.authenticate.findOne({
                where: {
                    token: decodeToken.token,
                },
            });
            const existedUsername = await db.client_account.findOne({
                where: {
                    username,
                },
            });
            if (existedUsername) {
                throw new AppError(400, 'Username existed');
            }
            const email = decodeToken.email;
            if (!authToken) {
                throw new AppError(400, 'Token is invalid');
            }
            if (authToken.usedTo !== 'create-account') {
                throw new AppError(400, 'Token is invalid');
            }
            const existedUser = await db.client_account.findOne({
                where: {
                    email,
                },
            });
            if (existedUser) {
                throw new AppError(400, 'Email existed');
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            await db.client_account.create({
                uid: uuid.v4(),
                username,
                password: hashPassword,
                display_name: displayname,
                email,
            });
            authToken.is_used = true;
            await authToken.save();
            return {
                statusCode: 200,
                message: 'Register successfully',
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
    checkToken: async (token, used_to) => {
        try {
            // catch error if token is invalid
            const decodeToken = JWT.verify(
                token,
                process.env.JWT_SECRET_KEY
                    ? process.env.JWT_SECRET_KEY
                    : 'default_secret_key',
            );
            if (!decodeToken) {
                throw new AppError(400, 'Token is invalid');
            }
            const authToken = await db.authenticate.findOne({
                where: {
                    token: decodeToken.token,
                },
            });
            if (!authToken) {
                throw new AppError(400, 'Token is invalid');
            }
            if (authToken.is_used) {
                throw new AppError(400, 'Token is invalid');
            }
            if (authToken.usedTo !== used_to) {
                throw new AppError(400, 'Token is invalid');
            }
            return {
                statusCode: 200,
                message: 'Token is valid',
            };
        } catch (error) {
            throw new AppError(error.statusCode, error.message);
        }
    },
};
