const router = require("express").Router();
const { User, Comment, Post } = require("../models");

// GET route for all posts
router.get('/', (req, res) => {
    console.log('======================');
   // data from post-routes.js in Post.findAll in GET route
    Post.findAll({
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true })); // gets all posts(objects) data in array
        res.render('homepage', { // sends data to homepage.handlerbars
          posts,
          loggedIn: req.session.loggedIn
        }); 
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// GET route for single post by id
 router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbPostData.get({ plain: true });
  
        // pass data to template
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
  
  // GET route for user login
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
      res.render('login');
    });
  
  module.exports = router;