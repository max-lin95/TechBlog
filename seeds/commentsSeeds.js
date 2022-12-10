const { Comments } = require('../models');

const commentsdata = [{
    comments_text: "Lorem ipsum",
    user_id: 1,
    posts_id: 1
},
{
    comments_text: "dolor sit",
    user_id: 2,
    posts_id: 2
},
{
    comments_text: "consectetur adipiscing",
    user_id: 3,
    posts_id: 3
}
];

const seedComments = () => Comments.bulkCreate(commentsdata);

module.exports = seedComments;