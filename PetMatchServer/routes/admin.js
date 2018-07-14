var db = require('../data/database')

const express = require('express')
const authCheck = require('./../middleware/auth-check')
const router = new express.Router()

router.use(authCheck)

router.get('/getReports',(req,res,next)=>{
    let reports = db.getReports();
    return res.status(200).json(reports)
})


module.exports = router