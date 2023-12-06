const router = require('express').Router();
const controller = require('./product.controller');
const { verifyToken } = require('../../middleware/verifyToken');
const { checkPermission } = require('../../middleware/checkPermission');

router.get('/', controller.getAllProduct);
router.get('/category', controller.getAllCategory);
router.get('/category/:category', controller.getAllProductByCategory);
router.get('/:product', controller.getProductDetail);
router.post(
    '/',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.createProduct,
);
router.put(
    '/:productid',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.updateProduct,
);
router.get(
    '/brand',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.getAllBrand,
);
router.post(
    '/brand',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.createBrand,
);
router.put(
    '/staff/:productid',
    verifyToken,
    checkPermission('staff'),
    controller.updateProductForStaff,
);
module.exports = router;
