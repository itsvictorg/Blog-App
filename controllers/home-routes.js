const router = require('express').Router();
const {User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    res.redirect('/homepage');
})


router.get('/homepage', async (req, res) => {
    const userData = req.session.data;
  try{  
    const dbPostData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'user_id',
        "post_text",
        'created_at'      
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['user_name', 'id']
          }
        },
        {
          model: User,
          attributes: ['user_name']
        }
      ]
    })
    const reversedPosts = dbPostData.map(post => post.get({ plain: true }));
    const posts = reversedPosts.reverse()  

    res.render('homepage', { 
      posts,
      userData,
      loggedIn: req.session.loggedIn 
    });
  }catch(err) {
    console.log(err);
    res.status(500).json(err);
  };
});
         



router.get('/post/:id', (req, res) => {
    const userData = req.session.data;
    //console.log(userData)
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'post_text',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at'
          ],
          include: {
            model: User,
            attributes: ['user_name']
          }
        },
        {
          model: User,
          attributes: ['user_name']
        }
      ]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Post found with this id' });
        return;
      }
      
      const post = dbPostData.get({ plain: true });
      
      console.log(post)
  
      
      res.render('single-post', {
        post, 
        userData,
        dbPostData,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.get('/user/:user_id', async (req, res) => {
    const userData = req.session.data;
    //console.log(req.params.user_id)
    //console.log(userData)
    try{
      const dbPostData = await Post.findAll({
      where: {
        user_id: req.params.user_id
      },
      attributes: ['id', 'title', 'post_text', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['user_name', 'id']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['user_name']
          }
        }
      ]
    })
    const posts = dbPostData.map(post => post.get({ plain: true }));
    
    const thisUser  = await Post.findOne({
        where: { 
            user_id: req.params.user_id
        },
        attributes: ['id', 'title', 'post_text', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['user_name', 'id']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['user_name']
            }
          }
        ]
    })
   
 const thisUserName = thisUser.User.dataValues.user_name
    
  
    res.render('single-user', { posts, userData, thisUser, thisUserName, loggedIn: true });
    
  } catch(err) {
    console.log(err)
    res.status(500).json(err);
  };
  });

router.get('/register', (req, res) => {
    const userData = req.session.data;
    res.render('register', {userData});
});

router.get('/login', (req, res) =>{
    const userData = req.session.data;
    if(!req.session.loggedIn){
    res.render('login')
  } else{
    res.redirect('/homepage');
  }
})

   







module.exports = router; 