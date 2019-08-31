const server = require('./api/server.js');
const mongoose = require('mongoose')

const connect = () => {
    server.listen(4500, () => {
        console.log('Listening to port 4500')
    })
    return mongoose.connect('mongodb://localhost:27017/keepinUpWithKoah', { useNewUrlParser: true })
}

connect()

