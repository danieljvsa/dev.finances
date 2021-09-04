const Payments = require('../models/payments')
const mongoose = require('mongoose')
const { db } = require('../models/payments')


module.exports = {
    async index (req, res) {
        const user_id = req.userId

        let payments = await Payments.find({user: mongoose.Types.ObjectId(user_id)}).populate('user').exec()  
        
        return res.status(200).json({payments: payments, user: req.userId})
    },

    async create (req,res) {
        const { type, value, date } = req.body;
        let status = ""
        try {
            if (!type || !value || !date){
                return res.status(400).json({error: 'Forgot one category.'})
            }

            if(value < 0){
                status = "Saída"
            }else{
                status = "Entrada"
            }
            const user_id = req.userId;
            const newPayments = new Payments({
                type: type, 
                value: value, 
                status: status,
                date: date,
                user: user_id
            })

            const pay = await newPayments.save().catch(err => console.log(err));
            return res.status(200).json({payments: pay, user: req.userId})
        
        } catch (error) {
            return res.status(400).json({error: 'No payments valid', err: error})
        }
    },

    async delete(req,res){
        try {
            await Payments.findByIdAndRemove({_id: mongoose.Types.ObjectId(req.params.id)})
            return res.status(200).json('Payment eliminated.')
          } catch {
            return res.status(400).json({error: 'No payments valid', err: error})
          }
    },

    async sum_earnings(req,res){
        const user_id = req.userId;
        Payments.aggregate([
            { "$match": {
                user:  mongoose.Types.ObjectId(user_id)
            }},
            {
                '$group': {
                  '_id': '$status', 
                  'totalamount': {
                    '$sum': '$value'
                  }
                }
            }
        ],function(err,result) {
            if(err){
                return res.status(400).send(err)
            }
            return res.status(200).send(result)
        
        })
    },

    async sum_total(req,res){
        const user_id = req.userId;
        Payments.aggregate([
            { "$match": {
                user:  mongoose.Types.ObjectId(user_id)
            }},
            {
                '$group': {
                    '_id': '',
                    'totalamount': {
                        '$sum': '$value'
                  }
                }
            }
        ],function(err,result) {
            if(err){
                return res.status(400).send(err)
            }
            return res.status(200).send(result)
        
        })
    },
}