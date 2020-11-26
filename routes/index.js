const router = require('express').Router()
const Controller = require('../controllers/Controller')
const authentication = require('../middleware/authentication')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/games', authentication, Controller.getGames)

router.get('/jokesAPI', Controller.jokesAPI)
router.post('/igdbAPI', Controller.igdbAPI)
router.get('/triviaAPI', Controller.triviaAPI)

module.exports = router