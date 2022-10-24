const user = require('./User');
const posts = require('./Posts');
const comments = require('./Comments');

user.hasMany(posts, {
    foreignKey: 'user_id'
});

posts.belongsTo(user, {
    foreignKey: 'user_id',
});

comments.belongsTo(user, {
    foreignKey: 'user_id'
});

comments.belongsTo(posts, {
    foreignKey: 'post_id'
});

user.hasMany(comments, {
    foreignKey: 'user_id'
});

posts.hasMany(comments, {
    foreignKey: 'post_id'
});

module.exports = { User, Posts, Comments };
