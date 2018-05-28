const Sequelize = require('sequelize');

function defineComment(database) {
    const Comment = database.define('comment', {
        content: {
            type: Sequelize.TEXT
        }
    });
    Comment.associate = ({ Post, User }) => {
        Comment.belongsTo(Post);
        Comment.belongsTo(User);
    };
    return Comment;
}

module.exports = defineComment;
