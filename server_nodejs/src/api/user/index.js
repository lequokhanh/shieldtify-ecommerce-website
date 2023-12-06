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
router.get(
    '/client',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.getClients,
);
router.get(
    '/client/:userId',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.getClientById,
);
router.put(
    '/client/:userId',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.updateClient,
);
router.put(
    '/address/:userId',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.updateAddress,
);
router.delete(
    '/address/:userId',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.deleteAddress,
);
router.get(
    '/staff',
    verifyToken,
    checkPermission('admin', 'superadmin'),
    controller.getAccounts,
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
router.put(
    '/address/:addressId',
    verifyToken,
    checkPermission('client'),
    controller.updateAddressClient,
);
router.delete(
    '/address/:addressId',
    verifyToken,
    checkPermission('client'),
    controller.deleteAddressClient,
);
module.exports = router;
