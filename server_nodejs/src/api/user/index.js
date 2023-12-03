const router = require('express').Router();
const controller = require('./user.controller');
const { verifyToken } = require('../../middleware/verifyToken');
const { checkPermission } = require('../../middleware/checkPermission');

router.get('/me', verifyToken, controller.getUser);
router.get(
    '/address',
    verifyToken,
    checkPermission('client'),
    controller.getAdresses,
);
router.post(
    '/address',
    verifyToken,
    checkPermission('client'),
    controller.createAddress,
);
module.exports = router;
