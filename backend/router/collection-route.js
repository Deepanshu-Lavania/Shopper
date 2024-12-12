const express = require('express');
const collectionRoute = require('../controllers/collection-controller');
const router = express.Router();

router.get('/newcollection',collectionRoute.newCollection)
router.get('/popularinwomen',collectionRoute.popularInwomen)
module.exports = router;