var db = require('../data/database')

const express = require('express')
const authCheck = require('./../middleware/auth-check')
const router = new express.Router()

router.get('/category/:category',(req,res,next)=>{
    let pets = db.getPetsByKind(req.params.category);
    return res.status(200).json(pets)
})

router.get('/getTop/',(req,res,next)=>{
    let petsDb = db.getTopPets();
    let pets = petsDb.map(p => {
        return {
            id: p.id,
            name: p.name,
            description: p.description,
            picture: p.pictures[0]
        }
    })
    return res.status(200).json(pets)
})

module.exports = router