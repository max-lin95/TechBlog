const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

// gets all the posts
router.get('/', withAuth, (req, res) => {
    Posts.findAll({
        where: {
            user_id: req.session.user_id
        },
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
                    attributes: [
                        'username'
                    ]
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostsData.map(posts => posts.get ({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// gets singular post
router.get('/edit/:id', withAuth, (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id
        },
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
            }
        ]
    })
    .then(dbPostsData => {
        if (!dbPostsData) {
            res.status(404).json({ message: 'No post found with this ID' });
            return;
        }

        const posts = dbPostsData.get({ plain:true });
        res.render('edit-post', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;