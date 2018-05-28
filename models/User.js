const Sequelize = require('sequelize');

//setup du model User
function defineUser(database) {
    const User = database.define('user', {
        fullname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        passwordConf: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM ('admin', 'user')
        }
    });
    User.associate = ({ Article, Comment }) => {
        User.hasMany(Article);
        User.hasMany(Comment);
    };
    return User;
}

module.exports = defineUser;
