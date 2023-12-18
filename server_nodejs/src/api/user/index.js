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
router.put(
    '/address/admin/:userId',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.updateAddressAdmin,
);
router.delete(
    '/address/admin/:userId',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.deleteAddressAdmin,
);
router.put(
    '/address/:addressId',
    verifyToken,
    checkPermission('client'),
    controller.updateAddress,
);
router.delete(
    '/address/:addressId',
    verifyToken,
    checkPermission('client'),
    controller.deleteAddressClient,
);
router.get(
    '/client/admin',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.getClients,
);
router.get(
    '/client/admin/:userId',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.getClientById,
);
router.put(
    '/client/admin/:userId',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.updateClient,
);

router.get(
    '/staff',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.getAccounts,
);
router.post(
    '/staff',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.createStaff,
);
router.put(
    '/staff/:id',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.updateAccount,
);
router.put(
    '/staff/:id/reset-password',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.resetPassword,
);
router.put(
    '/profile/client',
    verifyToken,
    checkPermission('client'),
    controller.updateProfileClient,
);
router.get(
    '/order/client',
    verifyToken,
    checkPermission('client'),
    controller.getOrderByClientID,
);
router.get(
    '/order/client/:orderId',
    verifyToken,
    checkPermission('client'),
    controller.getOrderByIdClient,
);
router.get(
    '/order/admin',
    verifyToken,
    checkPermission('admin', 'superadmin', 'staff'),
    controller.getAllOrders,
);
router.get(
    '/order/admin/status/:status',
    verifyToken,
    checkPermission('admin', 'superadmin', 'staff'),
    controller.getOrdersByStatus,
);
router.get(
    '/order/admin/:userId',
    verifyToken,
    checkPermission('admin', 'superadmin', 'staff'),
    controller.getOrderByIdAdmin,
);
router.put(
    '/order/admin/process/:orderId',
    verifyToken,
    checkPermission('admin', 'superadmin', 'staff'),
    controller.processOrders,
);
router.put(
    '/order/admin/:orderId',
    verifyToken,
    checkPermission('admin', 'superadmin', 'staff'),
    controller.updateOrder,
);

module.exports = router;
