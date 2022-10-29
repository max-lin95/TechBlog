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

