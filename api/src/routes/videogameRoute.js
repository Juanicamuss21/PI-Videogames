const express = require('express')
const router = express.Router()
// const { Sequelize } = require('sequelize');
const {getAllInfo} = require('../controllers/videogameControl')
const {Videogame, Genre} = require('../db')

router.get('/videogames', async (req, res) => {
    try{
        const {name} = req.query;
        const dataVideoGames = await getAllInfo()
        if(name){
            const videoGameName = await dataVideoGames.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            videoGameName.length ?
            res.status(200).send(videoGameName) :
            res.status(400).send({message: "VideoGame no encontrado"})
        }
        else{
        res.status(200).send(dataVideoGames)
        }
    }catch(error){
        res.status(400).send(error)
    }
});

router.get('/videogames/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const dataVideoGame = await getAllInfo()
        if(id){
            let videoGameId = id.length > 8 ? await dataVideoGame.find(el => el.id === id) : await dataVideoGame.find(el => el.id === parseInt(id)) 
            
            videoGameId  ?
            res.status(200).send(videoGameId) : 
            res.status(400).send({message: "No existe"})
        }      
    }catch(error){
        res.status(400).send(error)
    }
});

router.post('/videogames', async (req, res) => {
    try{
        const {name, released, rating, image, platform, genre} = req.body
        
        const videogameCreated = await Videogame.create({
            name,
            released,
            rating,
            image,
            platform,      
        })

        const findGenreInDb = await Genre.findAll({
            where: {name: genre}
            });
        
            console.log(findGenreInDb)

        videogameCreated.addGenre(findGenreInDb)

        const newVideoGame = await Videogame.findOne({
            where: {name: name},
            include: {model: Genre}
        })

        res.status(200).send(newVideoGame)

    }catch(error){
        res.status(404).send(`Error: ${error.message}`)
    }
})

router.get('/delete/:id', async(req, res) => {
    try{
        const {id} = req.params
        console.log(id)
        const deleteVideoGame = await Videogame.destroy({
            where: {id: id},
            include: {model: Genre}
           })
           res.send("borrado con exito")

    }catch(error){
        res.status(404).send(`Error: ${error.message}`)
    }
});

module.exports = router