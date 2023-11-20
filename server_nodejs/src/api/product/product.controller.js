const service = require('./product.service');

module.exports = {
    getAllProduct: async (req, res, next) => {
        try {
            const DTO = await service.getAllProduct(
                req.query.keyword ? req.query.keyword : '',
                req.query.page ? req.query.page : 1,
                req.query.sort ? req.query.sort : 'popular',
                req.query.priceRange ? req.query.priceRange : null,
                req.query.brands ? req.query.brands : null,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getAllCategory: async (req, res, next) => {
        try {
            const DTO = await service.getAllCategory();
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getAllProductByCategory: async (req, res, next) => {
        try {
            const DTO = await service.getAllProductByCategory(
                req.params.category,
                req.query.page ? req.query.page : 1,
                req.query.sort ? req.query.sort : 'popular',
                req.query.priceRange ? req.query.priceRange : null,
                req.query.brands ? req.query.brands : null,
                req.query.keyword ? req.query.keyword : '',
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getProductDetail: async (req, res, next) => {
        try {
            const DTO = await service.getProductDetail(req.params.product);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
