const router = require('express').Router();
const { Residents, Accounts, Leases } = require('../models');

const withAuth = require('../utils/auth');



router.get('/', async (req, res) => {
    
   
    
    if (req.session.loggedIn) {
        res.redirect('/homepage');
       
    }else{
       res.render('login');
    }
})


router.get('/user', async (req, res) => {
   
    if(req.session.loggedIn){    
        try {
                const userData = await Users.findByPk(req.session.data.id);
                console.log(userData)
                const resident = userData.get({ plain: true })
                res.render('user', {...users});
              } catch (err) {
                res.status(500).json(err);
              }
            }else{
                res.redirect('/')
            }
});







router.get('/dashboard', (req, res) => {
    
    if(req.session.loggedIn){
        res.render('dashboard');
    }else{
        res.redirect('/')
    }
    
});


router.get('/homepage', (req, res) => {
    
  if(req.session.loggedIn){
      res.render('homepage');
  }else{
      res.redirect('/')
  }
  
});

router.get('/register', (req, res) => {
  res.render('register');
});


   







module.exports = router; 