const express =require('express');
const getAuth = require('../controllers/getAuth-controller');
const authmiddleware = require('../middleware/auth-middleware');
const router = express.Router();

router.post('/getauth',authmiddleware,getAuth)

module.exports = router;