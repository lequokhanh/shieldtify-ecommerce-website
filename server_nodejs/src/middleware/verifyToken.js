const jwt = require('jsonwebtoken');
const { AppError } = require('../common/errors/AppError');
const db = require('../models');
exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            next(new AppError(401, 'Token is not valid'));
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let user;
        switch (decodeToken.role) {
            case 'client':
                user = await db.client_account.findOne({
                    where: {
                        id: decodeToken.userId,
                    },
                });
                user.role = 'client';
                break;
            case 'admin':
            case 'staff':
                user = await db.staff_account.findOne({
                    where: {
                        id: decodeToken.userId,
                    },
                });
                break;
            default:
                next(new AppError(403, 'Invalid role'));
        }
        delete user.password;
        if (!user) {
            next(new AppError(403, "This token doesn't belong to this user"));
        }
        if (user.change_password_at > decodeToken.iat) {
            next(new AppError(403, 'This user changed password recently'));
        }
        req.user = user;
        next();
    } catch (error) {
        next(new AppError(500, error.message));
    }
};
