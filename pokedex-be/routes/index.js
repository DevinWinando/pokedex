var express = require('express');
var router = express.Router();
var pokedexController = require('../controllers/pokedexController');

router.get('/', pokedexController.getPokedex);
router.post('/', pokedexController.createPokedex);
router.get('/:id', pokedexController.get);
router.post('/catch', pokedexController.catch);
router.post('/:id/release', pokedexController.release);
router.post('/:id/rename', pokedexController.rename);

module.exports = router;
