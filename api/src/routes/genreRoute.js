const express = require('express')
const router = express.Router()

const {getInfoApiGenre} = require('../controllers/genreControl')


router.get('/genres',async (req,res) => {
    try{
    const getGenre = await getInfoApiGenre()
    res.status(200).send(getGenre)

    }catch(error){
    res.status(404).send(error.message)   
    }
})

module.exports = router