const service = require('./cart.service');

module.exports = {
    getCart: async (req, res, next) => {
        try {
            const user = req.user;
            const DTO = await service.getCart(user.uid);
            res.status(DTO.statusCode).json(DTO);
        } catch (err) {
            next(err);
        }
    },
    updateCart: async (req, res, next) => {
        try {
            const user = req.user;
            const DTO = await service.updateCart(
                user.uid,
                req.body.item,
                req.body.quantity,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (err) {
            next(err);
        }
    },
    deleteCart: async (req, res, next) => {
        try {
            const user = req.user;
            const DTO = await service.deleteCart(user.uid);
            res.status(DTO.statusCode).json(DTO);
        } catch (err) {
            next(err);
        }
    },
    createCartItem: async (req, res, next) => {
        try {
            const user = req.user;
            const DTO = await service.createCartItem(user.uid, req.body.items);
            res.status(DTO.statusCode).json(DTO);
        } catch (err) {
            next(err);
        }
    },
    getDiscount: async (req, res, next) => {
        try {
            const user = req.user;
            const DTO = await service.getDiscount(user.uid, req.query.code);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    checkout: async (req, res, next) => {
        try {
            const user = req.user;
            const DTO = await service.checkout(user.uid, req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
