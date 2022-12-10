const { Posts } = require('../models');

const postsData = [{
    title: 'Title 1',
    content: 'Nunc mi ipsum faucibus vitae.',
    user_id: 1
},
{
    title: 'Title 2',
    content: 'Porta non pulvinar neque laoreet suspendisse interdum.',
    user_id: 2
},
{
    title: 'Title 3',
    content: 'In hac habitasse platea dictumst quisque sagittis.',
    user_id: 3
}
];

const seedPosts = () => Posts.bulkCreate(postsData);

module.exports = seedPosts;
