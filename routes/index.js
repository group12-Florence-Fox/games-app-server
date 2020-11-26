const router = require('express').Router()
const Controller = require('../controllers/Controller')
const authentication = require('../middleware/authentication')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/games', authentication, Controller.getGames)

module.exports = router