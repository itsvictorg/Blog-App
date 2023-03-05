const router = require('express').Router();
const { User } = require('../../models');

//CREATE new user
 router.post('/register', async (req, res) => {
  const randomId = Math.trunc(Math.random() * (9999 - 1111) + 1111)
  
  
  try {
    const dbUserData = await User.create({
      user_name: req.body.username,
      password: req.body.password,
      id: randomId,
      
    });

    

    
    req.session.save(() => {
      
      req.session.data = [dbUserData]
      console.log(req.session.data)
      res.status(200).json(dbUserData);
      const userData = req.session.data;
      
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});




// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        user_name: req.body.username,
      },
    });
    console.log(dbUserData)
  if(dbUserData.dataValues.user_name === 'itsvictorg'){
    dbUserData.dataValues.isAdmin = true;
  } else {
    dbUserData.dataValues.isAdmin = false;
  }
   console.log(dbUserData)
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'No User Found' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);
   
   

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect  password. Please try again!' });
        console.log('incorrect password');
        
      return;
    }
    
    req.session.save(() => {
      
      req.session.loggedIn = true;
      req.session.data = dbUserData
      

      
      console.log(req.session)
      

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
        
        //alert('You are now logged in')
        //res.redirect('/user')
       
        
        
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});




module.exports = router;
