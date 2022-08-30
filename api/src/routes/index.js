const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const {getAll, getById, getGenres, postVideogame , getPlatforms} = require('./controllers/videogameController')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getAll)
router.get('/videogame/:id', getById)
router.get('/genres', getGenres)
router.get('/platforms', getPlatforms)
router.post('/videogame', postVideogame)


module.exports = router;
