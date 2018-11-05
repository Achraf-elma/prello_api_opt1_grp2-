const express = require('express');
const router = express.Router();

router.use('/oauth', require('./oauth'));
router.use('/cards', require('./card'));
router.use('/lists', require('./list'));
router.use('/boards', require('./board'));

module.exports = router;

