const router = require('express').Router();
const {User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    res.redirect('/homepage');
})


router.get('/homepage', (req, res) => {
    router.get('/', (req, res) => {
        Post.findAll({
          attributes: [
            'id',
            'title',
            "post_text",
            'created_at'      
          ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
            const posts = dbPostData.map(post => post.get({ plain: true }));
           
            res.render('homepage', { 
              posts,
              loggedIn: req.session.loggedIn 
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
    res.render('homepage');

});

router.get('/post/:id', (req, res) => {
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
  
      
      res.render('single-post', {
        post, 
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) =>{
  if(!req.session.loggedIn){
    res.render('login')
  } else{
    res.redirect('/homepage');
  }
})

   







module.exports = router; 