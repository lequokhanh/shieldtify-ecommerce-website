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
};
