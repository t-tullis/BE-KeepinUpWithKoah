const server = require('./api/server.js');
const mongoose = require('mongoose')

const connect = () => {
    server.listen(5000, () => {
        console.log('Listening to port 5000')
    })
    return mongoose.connect('mongodb://localhost:27017/keepinUpWithKoah', { useNewUrlParser: true })
}

connect()

