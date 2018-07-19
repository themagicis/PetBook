var db = require('../data/database')

const express = require('express')
const authCheck = require('./../middleware/auth-check')
const router = new express.Router()

router.use(authCheck)

router.get('/getReports',(req,res,next)=>{
    let reports = db.getReports();
    return res.status(200).json(reports)
})

router.get('/getUsers',(req,res,next)=>{
    let users = db.getAllUsers();
    return res.status(200).json(users)
})

router.get('/getPets',(req,res,next)=>{
    let pets = db.getAllPets();
    return res.status(200).json(pets)
})


module.exports = router