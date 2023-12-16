const router = require('express').Router();
const controller = require('./product.controller');
const { verifyToken } = require('../../middleware/verifyToken');
const { checkPermission } = require('../../middleware/checkPermission');

router.get('/', controller.getAllProduct);
router.post(
    '/',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.createProduct,
);
router.get('/category', controller.getAllCategory);
router.post(
    '/category',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.createCategory,
);
router.put(
    '/category/:categoryid',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.updateCategory,
);
router.get('/category/:category', controller.getAllProductByCategory);
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
router.post('/image/:productid', controller.addImagesToProduct);
router.delete('/image/:productid', controller.deleteImageFromProduct);
router.put('/image/default/:productid', controller.setDefaultImage);
router.get('/:product', controller.getProductDetail);
router.put(
    '/:productid',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.updateProduct,
);
module.exports = router;
