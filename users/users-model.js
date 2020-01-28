const db = require('../database/dbConfig');

module.exports = {
    add, 
    find,
    findBy,
    findById
};

function find() {
    return db('users').select('id', 'username');
}

function findBy(user) {
    return db('users').where(user);
}

function add(user) {
return db('users')
    .insert(user, 'id')
    .then(ids => {
    const [id] = ids;
    return findById(id);
    });
}

function findById(id) {
    return db('users')
    .where({ id })
    .first();
}

