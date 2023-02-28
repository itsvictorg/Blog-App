const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes')
const dashboard = require('../dashboard-routes')


router.use('/users', userRoutes);
router.use('/post', postRoutes)
router.use('/dashboard', dashboard)


module.exports = router; 