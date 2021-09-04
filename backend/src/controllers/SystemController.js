const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const mailer = require('../modules/mailer')

function generateToken(params = {}){
  return jwt.sign(params, process.env.JWT_KEY, {
      expiresIn: 86400 // 24 hours
  })
}


module.exports = {
    async index(req,res) {
        let users = await User.find({})

        return res.status(200).json(users)
    },

    async create(req,res) {
        const { name, email, password} = req.body;

  
       if (!name || !email || !password) {
            res.status(400).json('Dados incorretos')
        }
        
        else {
        User.findOne({ email: email }).then(user => {
            const newUser = new User({
                name,
                email,
                password})
    
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => {
                        res.status(200).send({user: user.name, token: generateToken({ id: user.id })})
                    })
                    .catch(err => res.status(400).json(err));
                })
            })
            })
        }
    },
    async authenticate (req,res) {
        const {email, password} = req.body
        //res.json({email: email, password: password})
        const user = await User.findOne({
            email: email
          }).select('+password')
        if (!user) {
          return res.status(400).json('That email is not registered')
        }

        // Match password
        if(!await bcrypt.compare(password, user.password)){
          return res.json({ message: 'Password incorrect' })
        }

        user.password = undefined

        return res.status(200).send({email: user.email,name: user.name, token: generateToken({ id: user.id })})
        
    },

    async forgot_password(req,res){
      const {email} = req.body
      try {
        const user = await User.findOne({email: email})

        if (!user) {
          return res.status(401).json('No User found with this email.')
        }

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)

        await User.findByIdAndUpdate(user.id, {
          '$set': {
            passwordResetToken: token,
            passwordResetExpires: now
          }
        })

        mailer.sendMail({
          to: email,
          from: "danielviana18@gmail.com",
          template: 'auth/forgot_password',
          context: {token}
        }, (err) => {
          if (err) {
            console.log(err)
            return res.status(400).json('Cannot send token')
          }
          res.send()
        })

      } catch (error) {
        return res.status(400).json('Error on forgot password, try again')
      }
    },

    async reset_password(req,res){
      const {email, token, password} = req.body

      try {
        const user = await User.findOne({email: email}).select('+passwordResetToken passwordResetExpires')

        if (!user) {
          return res.status(401).json('No User found with this email.')
        }

        if (token !== user.passwordResetToken) {
          return res.status(401).json('Token invalid.')
        }

        const now = new Date()

        if (now > user.passwordResetExpires) {
          return res.status(401).json('Token expired.')
        }

        user.password = password

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user.save()
        })})
        res.send()
      } catch (error) {
        return res.status(400).json('Error on reset password, try again')
      }
    }
    
}
