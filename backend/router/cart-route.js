const express = require('express');
const CartItem = require('../controllers/cart-controller');
const authmiddleware = require('../middleware/auth-middleware');
const router = express.Router();

router.post('/addtocart',authmiddleware,CartItem.addtoCart)
router.post('/removetocart',authmiddleware,CartItem.removetoCart)
router.post('/getcart',CartItem.getAll_cartNum);

module.exports = router;