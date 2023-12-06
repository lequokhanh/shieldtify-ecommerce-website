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
    getClients: async (req, res, next) => {
        try {
            const DTO = await service.getClients(
                req.query.page,
                req.query.keyword,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getClientById: async (req, res, next) => {
        try {
            const DTO = await service.getClientById(req.params.userId);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateClient: async (req, res, next) => {
        try {
            const DTO = await service.updateClient(req.param.userId, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateAddress: async (req, res, next) => {
        try {
            const DTO = await service.updateAddress(req.param.userId, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    deleteAddress: async (req, res, next) => {
        try {
            const DTO = await service.deleteAddress(
                req.param.clientid,
                req.query.uid,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getAccounts: async (req, res, next) => {
        try {
            const DTO = await service.getAccounts(
                req.query.page,
                req.query.keyword,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateAccount: async (req, res, next) => {
        try {
            const DTO = await service.updateAccount(
                req.user.role,
                req.params.id,
                req.body,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const DTO = await service.resetPassword(
                req.user.role,
                req.params.id,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getProfileClient: async (req, res, next) => {
        try {
            const DTO = await service.getClientById(req.user.uid);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateProfileClient: async (req, res, next) => {
        try {
            const DTO = await service.updateClient(req.user.uid, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateAddressClient: async (req, res, next) => {
        try {
            const DTO = await service.updateAddress(req.user.uid, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    deleteAddressClient: async (req, res, next) => {
        try {
            const DTO = await service.deleteAddress(
                req.user.uid,
                req.params.addressId,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
