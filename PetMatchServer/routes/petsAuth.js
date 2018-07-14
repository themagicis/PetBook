var db = require('../data/database')

const express = require('express')
const authCheck = require('./../middleware/auth-check')
const router = new express.Router()

router.use(authCheck)

router.get('/get/:id',(req,res,next)=>{
    let pet = db.getPet(parseInt(req.params.id));
    let owner = db.getUserById(pet.ownerId);
    pet.owner = {
        name: owner.name,
        picture: owner.picture
    }
    return res.status(200).json(pet)
})

router.post('/add',(req,res,next)=>{
    req.body.ownerId = req.user.id,
    db.addPet(req.body);
    db.saveChanges();
    res.status(200).json(req.body)
})

router.post('/report',(req,res,next)=>{
    let report = {
        reportedBy: req.user.id,
        petId: req.body.petId,
        reportedDate: new Date()
    }
    db.addReport(report);
    db.saveChanges();
    res.status(200).json({})
})

module.exports = router