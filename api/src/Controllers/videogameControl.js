const axios = require('axios')
const {Videogame, Genre} = require('../db.js')
const {APY_KEY} = process.env;
const BASE_URL = 'https://api.rawg.io/api/games';

const getVideogamesFromPage = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}?key=${APY_KEY}&page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching data from page ${page}:`, error.message);
    return [];
  }
};

const getInfoApi = async () => {
  try {
    const pageCount = 5;
    const promises = [];

    for (let page = 1; page <= pageCount; page++) {
      promises.push(getVideogamesFromPage(page));
    }

    const apiVideogamesTotal = await Promise.all(promises);
    const apiVideogamesFlat = apiVideogamesTotal.flat();

    const dataApiVideoGames = apiVideogamesFlat.map((el) => {
      return {
        id: el.id,
        name: el.name,
        image: el.background_image,
        released: el.released,
        rating: el.rating,
        platform: el.platforms.map((platform) => platform.platform.name),
        genre: el.genres.map((genre) => genre.name),
        // recommended: el.platforms.map(el  => el.platform.name === "PC" && el.requirements_en ?el.requirements_en.recommended : el.requirements_ru.recommended)
      };
    });

    return dataApiVideoGames;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return [];
  }
};

// Llamar a la función getInfoApi para obtener los datos
// getInfoApi()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error('Error in getInfoApi:', error.message);
//   });



// const getInfoApi = async () => {
//     const apiVideogames = await axios.get(`https://api.rawg.io/api/games?key=${APY_KEY}`);

//     const apiVideogames2 = await axios.get(`https://api.rawg.io/api/games?key=${APY_KEY}&page=2`);

//     const apiVideogames3 = await axios.get(`https://api.rawg.io/api/games?key=${APY_KEY}&page=3`)

//     const apiVideogames4 = await axios.get(`https://api.rawg.io/api/games?key=${APY_KEY}&page=4`)

//     const apiVideogames5 = await axios.get(`https://api.rawg.io/api/games?key=${APY_KEY}&page=5`)

//     const apiVideogamesTotal = apiVideogames.data.results.concat(apiVideogames2.data.results).concat(apiVideogames3.data.results).concat(apiVideogames4.data.results).concat(apiVideogames5.data.results)

//     const dataApiVideoGames = apiVideogamesTotal && apiVideogamesTotal.map(el => {     
//         return {
//             id: el.id,
//             name:el.name,
//             image:el.background_image,
//             released: el.released,
//             rating: el.rating,
//             platform: el.platforms.map(el => el.platform.name),
//             genre: el.genres.map(el => el.name),

//         }
//     })

//     return dataApiVideoGames
// }

const getInfoDb = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
};

const getAllInfo = async() => {
    const infoApi = await getInfoApi()
    const infoDb = await getInfoDb()
    const allInfo = infoApi.concat(infoDb)
    return allInfo
}


module.exports = {getAllInfo} 