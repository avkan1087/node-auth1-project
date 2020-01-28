const router = require('express').Router();

const db = require('./users-model');
const restricted = require('../auth/middleware');

router.get('/', restricted, (req, res) => {
    db.find()
    .then(users => {
    res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
