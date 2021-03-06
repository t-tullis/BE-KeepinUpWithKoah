const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const postRouter = require('../posts/postRouter')
const userRouter = require('../users/userRouter')

const server = express();

//middleware
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

//Routers
server.use('/api', postRouter);
server.use('/api', userRouter);

server.get('/', (req, res) => {
    res.send('Keepin up w/ Koah API')
})

module.exports = server;

