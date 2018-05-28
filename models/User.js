const Sequelize = require('sequelize');

//setup du model User
function defineUser(database) {
    const User = database.define('user', {
        fullname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM ('admin', 'user')
        }
    });
    User.associate = ({ Post, Comment }) => {
        User.hasMany(Post);
        User.hasMany(Comment);
    };
    return User;
}

module.exports = defineUser;
