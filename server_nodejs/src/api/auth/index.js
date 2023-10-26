const router = require('express').Router();
const controller = require('./auth.controller');

router.get('/existed-email', controller.existedEmail);
router.get('/send-email-register', controller.sendEmailRegister);
router.post('/register', controller.register);
router.get('/check-token', controller.checkToken);
// router.post('/login', controller.login);

// router.post('/');

module.exports = router;
