const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { Post, Comment, User } = require('../models');

router.get('/', (req, res) => {
    Post
        .findAll({ include: [User] })
        .then((posts) => {
            res.render('website/home', { posts, loggedInUser: req.user });
        });
});

router.get('/signin', (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('website/signin');
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin'
}));

router.get('/signup', (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('website/signup');
});

router.post('/signup', (req, res) => {
    const { fullname, email, password } = req.body;
    bcrypt
        .hash(password, 12)
        .then((hash) => {
            User
                .create({ fullname, email, password: hash })
                .then((user) => {
                    req.login(user, () => res.redirect('/'));
                });
        });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//gestion des posts
router.get('/new', (req, res) => {
    res.render('website/new', { loggedInUser: req.user });
});

router.post('/new', (req, res) => {
    const { title, content } = req.body;
    Post
        .create({ title, content, userId: req.user.id })
        .then(() => {
            res.redirect('/');
        });
});

//detail d'un poste via titre du post
router.get('/posts/:postId', (req, res) => {
    Post
        .findById(req.params.postId, { include: [User, {model: Comment, include: [User]} ] })
        .then((post) => {
            res.render('website/post', { post, loggedInUser: req.user });
        });
});

//gestion des commentaires
router.post('/api/posts/:postId', (req, res) => {
    const { content } = req.body;
    Comment
        .create({
            content,
            userId: req.user.id,
            postId: req.params.postId
        })
        .then(() => {
            res.redirect(`/posts/${req.params.postId}`);
        });
});

//edition d'un post
router.get('/posts/:postId/edit', (req, res) => {
    Post
        .findById(req.params.postId)
        .then((post) => {
            res.render('website/edit', { post, loggedInUser: req.user });
        });
});

router.post('/posts/:postId/edit', (req, res) => {
    const { title, content, status } = req.body;
    Post
        .update({ title, content, status }, { where: { id: req.params.postId } })
        .then(() => {
            res.redirect(`/posts/${req.params.postId}`);
        });
});

//route vers le profil de l'utilisateur
router.get('/userProfile/:userId', (req, res) => {
    User
        .findById(req.params.userId, { include: [Post] })
        .then((user) => {
            res.render('website/userProfile', { user, loggedInUser: req.user });
        });
});

module.exports = router;
