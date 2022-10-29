const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts, User, Comments } = require('../models');

router.get('/', (req, res) => {
    Posts.findAll({
      attributes: [
        'created_at',
        'id',
        'title',
        'posts_content'     
      ],
      include: [
        {
            model: Comments,
            attributes: [
                'id', 'comments_content', 'posts_id', 'user_id', 'created_at'
            ],
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
    .then(dbPostsData => {
        const posts = dbPostsData.map(posts => posts.get({ plain:true }));
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

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/posts/:id', (req, res) => {
    Posts.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'title',
          'posts_content',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: [
              'id',
              'comments_content',
              'posts_id',
              'user_id',
              'created_at'
            ],
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
      .then(dbPostsData => {
        if (!dbPostsData) {
          res.status(404).json({ message: 'No Post found with this id' });
          return;
        }
        const post = dbPostsData.get({ plain: true });
    
        res.render('single-post', {
          posts, 
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });
    
    module.exports = router;
      