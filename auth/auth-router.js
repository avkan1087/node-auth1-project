const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../users/users-model');


router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    db.add(user)
    .then(saved => {
    res.status(201).json(saved);
    })
    .catch(error => {
        console.log(error);
    res.status(500).json(error);
    });
});


router.post('/login', (req, res) => {
    let { username, password } = req.body;

    db.findBy({ username })
    .first()
    .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}!`});
    } else {
        res.status(401).json({ message: 'Invalid Credentials'});
    }
    })
    .catch(error => {
    res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        error ? res.status(500).json({ message: "Already logged out"}) 
        : res.status(200).json({ message: 'logged out'}) 
    });
});

module.exports = router;