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
            const DTO = await service.updateClient(req.params.userId, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    deleteAddressAdmin: async (req, res, next) => {
        try {
            const DTO = await service.deleteAddress(
                req.params.userId,
                req.query.addressId,
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
                req.user.uid,
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
    updateProfileClient: async (req, res, next) => {
        try {
            const DTO = await service.updateClient(req.user.uid, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateAddress: async (req, res, next) => {
        try {
            const DTO = await service.updateAddress(
                req.user.uid,
                req.params.addressId,
                req.body,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateAddressAdmin: async (req, res, next) => {
        try {
            const DTO = await service.updateAddress(
                req.params.userId,
                req.query.addressId,
                req.body,
            );
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
    getAllOrders: async (req, res, next) => {
        try {
            const DTO = await service.getAllOrders(
                req.query.page,
                req.query.keyword,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getOrderByClientID: async (req, res, next) => {
        try {
            const DTO = await service.getOrderByClientID(req.user.uid);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getOrderByIdClient: async (req, res, next) => {
        try {
            const DTO = await service.getOrderByID(
                req.params.orderId,
                req.user.uid,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getOrderByIdAdmin: async (req, res, next) => {
        try {
            const DTO = await service.getOrderByID(
                req.query.orderId,
                req.params.userId,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    createStaff: async (req, res, next) => {
        try {
            const DTO = await service.createStaff(req.user.role, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getOrdersByStatus: async (req, res, next) => {
        try {
            const DTO = await service.getOrdersByStatus(
                req.query.status,
                req.query.page,
                req.query.keyword,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateOrder: async (req, res, next) => {
        try {
            const DTO = await service.updateOrder(
                req.user.uid,
                req.params.orderId,
                req.body,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    processOrders: async (req, res, next) => {
        try {
            const DTO = await service.processOrders(
                req.user.uid,
                req.body,
                parseInt(req.query.type),
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updatePasswordStaff: async (req, res, next) => {
        try {
            const DTO = await service.updatePasswordStaff(
                req.user.uid,
                req.body,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
