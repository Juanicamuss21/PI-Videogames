const axios = require('axios')
const {Genre} = require('../db')

const getInfoApiGenre = async () => {
    const apiGenre = await axios.get("https://api.rawg.io/api/genres?key=d4c41d06d8cd4ea5b1a5cacefa0b8d5a")

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