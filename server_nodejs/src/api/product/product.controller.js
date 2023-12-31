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
    getAllBrand: async (req, res, next) => {
        try {
            const DTO = await service.getAllBrand();
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    createBrand: async (req, res, next) => {
        try {
            const DTO = await service.createBrand(req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const DTO = await service.createProduct(req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const DTO = await service.updateProduct(
                req.params.productid,
                req.body,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateProductForStaff: async (req, res, next) => {
        try {
            const allowedUpdates = ['description'];
            const updates = Object.keys(req.body);
            const isValidOperation = updates.every((update) =>
                allowedUpdates.includes(update),
            );
            if (!isValidOperation) {
                return res.status(400).send({ error: 'Invalid updates!' });
            }
            const DTO = await service.updateProduct(
                req.params.productid,
                req.body,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    addImagesToProduct: async (req, res, next) => {
        try {
            const DTO = await service.addImagesToProduct(
                req.params.productid,
                req.body,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    deleteImageFromProduct: async (req, res, next) => {
        try {
            const DTO = await service.deleteImageFromProduct(
                req.params.productid,
                req.query.imgid,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    setDefaultImage: async (req, res, next) => {
        try {
            const DTO = await service.setDefaultImage(
                req.params.productid,
                req.query.imgid,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    createCategory: async (req, res, next) => {
        try {
            const DTO = await service.createCategory(req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    updateCategory: async (req, res, next) => {
        try {
            const DTO = await service.updateCategory(
                req.params.categoryid,
                req.body,
            );
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
