var db = require('../data/database')

const express = require('express')
const authCheck = require('./../middleware/auth-check')
const router = new express.Router()

//router.use(authCheck)

router.get('/getAll',(req,res,next)=>{
    let pets = db.getPets(0);
    return res.status(200).json(pets)
})

module.exports = router