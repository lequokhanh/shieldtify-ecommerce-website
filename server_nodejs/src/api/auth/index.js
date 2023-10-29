const router = require('express').Router();
const controller = require('./auth.controller');
const { verifyToken } = require('../../middleware/verifyToken');

router.get('/existed-email', controller.existedEmail);
router.get('/send-email-register', controller.sendEmailRegister);
router.post('/register', controller.register);
router.get('/check-token', controller.checkToken);
router.post('/login/client', controller.login);
router.post('/logout', controller.logout);
router.get('/me', verifyToken, controller.getUser);
router.post('/send-email-reset-password', controller.sendEmailResetPassword);
router.post('/reset-password', controller.resetPassword);
// router.post('/');

module.exports = router;
