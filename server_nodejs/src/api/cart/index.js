const router = require('express').Router();
const controller = require('./cart.controller');
const { verifyToken } = require('../../middleware/verifyToken');
const { checkPermission } = require('../../middleware/checkPermission');

router.get('/', verifyToken, checkPermission('client'), controller.getCart);
router.put('/', verifyToken, checkPermission('client'), controller.updateCart);
router.delete(
    '/',
    verifyToken,
    checkPermission('client'),
    controller.deleteCartItem,
);
router.delete(
    '/all',
    verifyToken,
    checkPermission('client'),
    controller.deleteCart,
);
router.post(
    '/',
    verifyToken,
    checkPermission('client'),
    controller.createCartItem,
);
router.get(
    '/discount',
    verifyToken,
    checkPermission('client'),
    controller.getDiscount,
);
module.exports = router;
