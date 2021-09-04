if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const connection = require('./database/connection')
const routes = require('./routes')

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)


connection.once("open", async function() {
    console.log("MongoDB database connection established successfully");
});



app.listen( process.env.PORT || 3333,() => {
    console.log('Listenning to requests on port 3333')
})