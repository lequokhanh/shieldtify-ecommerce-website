const router = require('express').Router();
const auth = require('./auth');
const product = require('./product');

router.use('/auth', auth);
router.use('/product', product);

module.exports = router;
