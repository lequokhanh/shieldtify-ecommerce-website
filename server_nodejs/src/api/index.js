const router = require('express').Router();
const auth = require('./auth');
const product = require('./product');
const cart = require('./cart');

router.use('/auth', auth);
router.use('/product', product);
router.use('/cart', cart);

module.exports = router;
