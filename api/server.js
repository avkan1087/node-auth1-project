const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sessions = require("express-session"); 
const KnexSessionStore = require("connect-session-knex")(sessions)

//Routers paths
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const knex = require("../database/dbConfig.js");


const server = express();

//Session Storage and Cookies

const sessionConfig ={
    name: 'kamehameha', 
    secret: 'Broly is the strongest saiyan',
    saveUninitialized: true, 
    resave: false,
    store: new KnexSessionStore({
    knex, 
    createtable: true,
    clearInterval: 1000 * 60 * 10,
    sidfieldname: 'sid',
    tablename: 'sessions'
    }), 

    cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true, 
    }
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfig));

//Endpoints
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.json({ api: "working" });
});

module.exports = server;