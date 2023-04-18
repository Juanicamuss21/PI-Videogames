const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRouter = require('./videogameRoute');
const genreRouter= require('./genreRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', videogameRouter)
router.use('/', genreRouter)

module.exports = router;
