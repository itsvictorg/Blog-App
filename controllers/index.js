const router = require('express').Router();

const apiRoutes = require('./api/index.js');
const homeRoutes = require('./home-routes.js');
const dashboard = require('./dashboard-routes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboard)

module.exports = router;