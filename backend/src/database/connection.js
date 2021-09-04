if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mongoose = require('mongoose')

const {DATABASE_URL} = process.env

mongoose.connect(DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,
	useFindAndModify: false })

const connection = mongoose.connection;


module.exports = connection