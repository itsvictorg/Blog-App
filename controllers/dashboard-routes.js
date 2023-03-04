const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
  const userData = req.session.data;
  try{
    const dbPostData = await Post.findAll({
    where: {
      user_id: req.session.data.id
    },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['user_name']
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
  
  console.log(userData)
  

  res.render('dashboard', { posts, userData, loggedIn: true });

} catch(err) {
  console.log(err)
  res.status(500).json(err);
};
});



//.then(dbPostData => {
//    
//    const posts = dbPostData.map(post => post.get({ plain: true }));
//    console.log(posts)
//    res.render('dashboard', { posts, loggedIn: true });
//
//  })
//  .catch(err => {
//   
//    console.log(err)
//    res.status(500).json(err);
//  });
//});


router.get('/edit/:id', async (req, res) => {
 await Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['user_name']
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
    .then(dbPostData => {
      const userData = req.session.data;
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
     
      const post = dbPostData.get({ plain: true });
      
      res.render('edit-post', { post, userData, loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/new', withAuth, (req, res) => {
  const userData = req.session.data;
  console.log(req.session)
  res.render('new-post', { userData, loggedIn: req.session.loggedIn });
});


module.exports = router;