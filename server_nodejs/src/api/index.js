const router = require('express').Router();
const auth = require('./auth');
const product = require('./product');
const cart = require('./cart');
const user = require('./user');

router.use('/auth', auth);
router.use('/product', product);
router.use('/cart', cart);
router.use('/user', user);

module.exports = router;
