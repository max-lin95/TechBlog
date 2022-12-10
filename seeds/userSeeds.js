const { User } = require('../models');

const userData = [{
    username: 'Tom',
    password: 'tompassword'
},
{
    username: 'Stan',
    password: 'stanpassword'
},
{
    username: 'Grace',
    password: 'gracepassword'
}
];

const seedUser = () = User.bulkCreate(userData);

module.exports = seedUser;