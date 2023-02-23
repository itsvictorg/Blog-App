const router = require('express').Router();
const userRoutes = require('./user-routes');
const putRequest = require('./put-request')

router.use('/users', userRoutes);
router.use('/put-request', putRequest)

module.exports = router; 