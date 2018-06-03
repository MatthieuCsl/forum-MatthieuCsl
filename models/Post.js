const Sequelize = require('sequelize');

function definePost(database) {
    const Post = database.define('post', {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.ENUM ('solved', 'unsolved')
        }
    });
    Post.associate = ({ User, Comment }) => {
        Post.belongsTo(User);
        Post.hasMany(Comment);
    };
    return Post;
}

module.exports = definePost;
