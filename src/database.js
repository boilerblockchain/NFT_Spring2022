const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/my_database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB connected with host: ${con.connection.host}`)
    })
}

module.exports = connectionDatabase