const router = require('express').Router();
const controller = require('./product.controller');
const { verifyToken } = require('../../middleware/verifyToken');
const { checkPermission } = require('../../middleware/checkPermission');

router.get('/', controller.getAllProduct);
router.get('/category', controller.getAllCategory);
router.get('/category/:category', controller.getAllProductByCategory);
router.get('/:product', controller.getProductDetail);
// router.post(
//     '/',
//     verifyToken,
//     checkPermission('admin'),
//     controller.createProduct,
// );
// router.put(
//     '/',
//     verifyToken,
//     checkPermission('admin'),
//     controller.updateProduct,
// )

module.exports = router;
