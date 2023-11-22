const jwt = require('jsonwebtoken');
const { AppError } = require('../common/errors/AppError');
const db = require('../models');
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new AppError(400, 'Token is invalid');
        }
        const decodeToken = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
                ? process.env.JWT_SECRET_KEY
                : 'default_secret_key',
        );
        let user;
        switch (decodeToken.role) {
            case 'client':
                user = await db.client_account.findOne({
                    where: {
                        uid: decodeToken.user_id,
                    },
                });
                user.dataValues.role = 'client';
                break;
            case 'admin':
            case 'staff':
                user = await db.staff_account.findOne({
                    where: {
                        uid: decodeToken.user_id,
                    },
                });
                break;
            default:
                throw new AppError(403, 'Invalid role');
        }
        delete user.dataValues.password;
        if (!user) {
            throw new AppError(403, "This token doesn't belong to this user");
        }
        if (user.changed_password_at / 1000 > decodeToken.iat) {
            throw new AppError(403, 'This user changed password recently');
        }
        req.user = user.dataValues;
        next();
    } catch (error) {
        next(error);
    }
};
