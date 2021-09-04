const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars');
const path = require('path')
const {NODE_HOST, NODE_PORT, NODE_USER, NODE_PASS} = process.env

var transport = nodemailer.createTransport({
    host: NODE_HOST,
    port: NODE_PORT,
    auth: {
      user: NODE_USER,
      pass: NODE_PASS
    }
  });

transport.use('compile', hbs({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html', 
}))

module.exports = transport