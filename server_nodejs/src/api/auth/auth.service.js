const db = require('../../models');
const { AppError } = require('../../common/errors/AppError');
const { sendMailForCreatePassword } = require('../../common/email');
const uuid = require('uuid');
module.exports = {
    existedEmail: async ({ email }) => {
        try {
            const user = await db.client_account.findOne({
                where: {
                    email,
                },
            });
            return {
                statusCode: 200,
                message: user ? 'Email existed' : 'Email not existed',
            };
        } catch (error) {
            throw new AppError(500, error.message);
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
            throw new AppError(500, error.message);
        }
    },
    register: async ({ username, password, display, token }) => {
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
            const token = await db.authenticate.findOne({
                where: {
                    token: decodeToken.token,
                },
            });
            const email = decodeToken.email;
            if (!token) {
                throw new AppError(400, 'Token is invalid');
            }
            if (token.usedTo !== 'create-account') {
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
            const user = await db.client_account.create({
                username,
                password,
                display,
                email,
            });
            token.is_used = true;
            await token.save();
            return {
                statusCode: 200,
                message: 'Register successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
};