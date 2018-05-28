const Sequelize = require('sequelize');

function defineArticle(database) {
    const Article = database.define('article', {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        }
    });
    Article.associate = ({ User, Comment }) => {
        Article.belongsTo(User);
        Article.hasMany(Comment);
    };
    return Article;
}

module.exports = defineArticle;
