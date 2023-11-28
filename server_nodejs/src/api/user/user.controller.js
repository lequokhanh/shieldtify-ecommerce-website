const service = require('./user.service');

module.exports = {
    getUser: async (req, res, next) => {
        try {
            res.status(200).json({
                statusCode: 200,
                message: 'Get user successfully',
                data: req.user,
            });
        } catch (error) {
            next(error);
        }
    },
    getAdresses: async (req, res, next) => {
        try {
            const user = req.user;
            const DTO = await service.getAddresses(user.uid);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    createAddress: async (req, res, next) => {
        try {
            const user = req.user;
            const DTO = await service.createAddress(user.uid, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
