const seedComments = require('./commentsSeeds');
const seedPosts = require('./postsSeeds');
const seedUser = require('./userSeeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedComments();
    await seedPosts();
    await seedUser();
    process.exit(0);
};

seedAll();