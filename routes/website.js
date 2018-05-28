const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { Article, Comment, User } = require('../models');

router.get('/', (req, res) => {
    Article
        .findAll({ include: [User] })
        .then((articles) => {
            res.render('website/home', { articles, loggedInUser: req.user });
        });
});

module.exports = router;
