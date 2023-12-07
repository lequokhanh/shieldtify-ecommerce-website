const service = require('./auth.service');

module.exports = {
    existedEmail: async (req, res, next) => {
        try {
            const DTO = await service.existedEmail(req.query);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    sendEmailRegister: async (req, res, next) => {
        try {
            const DTO = await service.sendEmailRegister(req.query);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    register: async (req, res, next) => {
        try {
            const DTO = await service.register(req.query.token, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    checkToken: async (req, res, next) => {
        try {
            const DTO = await service.checkToken(
                req.query.token,
                req.query.used_to,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const DTO = await service.login(req.body);
            res.cookie('token', DTO.token, {
                sameSite: 'none',
                secure: true,
                httpOnly: true,
                maxAge: 3600000 * 24,
            });
            delete DTO.token;
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    loginAdmin: async (req, res, next) => {
        try {
            const DTO = await service.loginAdmin(req.body);
            res.cookie('token', DTO.token, {
                sameSite: 'none',
                secure: true,
                httpOnly: true,
                maxAge: 3600000 * 24,
            });
            delete DTO.token;
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        try {
            res.clearCookie('token');
            res.status(200).json({
                statusCode: 200,
                message: 'Logout successfully',
            });
        } catch (error) {
            next(error);
        }
    },
    sendEmailResetPassword: async (req, res, next) => {
        try {
            const DTO = await service.sendEmailResetPassword(req.query.email);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const DTO = await service.resetPassword(req.query.token, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
