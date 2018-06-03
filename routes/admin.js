const router = require('express').Router();
const { Post } = require('../models');
const { User } = require('../models');

//edition d'un post
router.get('/userProfile/:userId/edit', (req, res) => {
    User
        .findById(req.params.userId)
        .then((user) => {
            res.render('admin/editUser', { user, loggedInUser: req.user });
        });
});

router.post('/userProfile/:userId/edit', (req, res) => {
    const { fullname, email } = req.body;
    User
        .update({ fullname, email }, { where: { id: req.params.userId } })
        .then(() => {
            res.redirect(`/userProfile/${req.params.userId}`);
        });
});

module.exports = router;
