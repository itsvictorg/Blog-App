const router = require('express').Router();
const { Residents, Accounts, Leases } = require('../models');

const withAuth = require('../utils/auth');



router.get('/', async (req, res) => {
    res.redirect('/homepage');
})

router.get('/dashboard', async (req, res) => {
    res.render('dashboard')
});

router.get('/homepage', (req, res) => {
    res.render('homepage');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) =>{
    res.render('login')
})

   







module.exports = router; 