const axios = require('axios')
const {Genre} = require('../db')
const {APY_KEY} = process.env;

const getInfoApiGenre = async () => {
    const apiGenre = await axios.get(`https://api.rawg.io/api/genres?key=${APY_KEY}`)

    const dataApiGenres = apiGenre.data.results.map(genre => genre.name)          

    dataApiGenres.forEach(async el => {
        await Genre.findOrCreate({
              where: {name: el}
          })
      });

      const allGenres = await Genre.findAll();
        return allGenres;

}  



module.exports = {getInfoApiGenre}