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
    deleteCartItem: async (req, res, next) => {
        try {
            const user = req.user;
            const DTO = await service.deleteCartItem(user.uid, req.query.item);
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
            const DTO = await service.createCartItem(
                user.uid,
                req.body.item,
                req.body.quantity,
            );
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
};
