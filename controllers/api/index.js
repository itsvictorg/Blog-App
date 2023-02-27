const router = require('express').Router();
const userRoutes = require('./user-routes');
const putRequest = require('./put-request')
const dashboard = require('./dashboard-routes')

router.use('/users', userRoutes);
router.use('/put-request', putRequest)
router.use('/dashboard', dashboard)

module.exports = router; 