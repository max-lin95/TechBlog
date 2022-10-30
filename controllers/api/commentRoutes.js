const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comments.findAll()
    .then(dbCommentsData => res.json(dbCommentsData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    if (req.session) {
      Comments.create({
        comments_content: req.body.comments_content,      
        posts_id: req.body.posts_id,
        user_id: req.session.user_id
      })
      .then(dbCommentsData => res.json(dbCommentsData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    }
});

router.delete('/:id', (req, res) => {
    Comments.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCommentsData => {
        if (!dbCommentsData) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
        }
        res.json(dbCommentsData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
  
  module.exports = router;