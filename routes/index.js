const router = require('express').Router()
const Controller = require('../controllers/Controller')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.get('/jokesAPI', Controller.jokesAPI)
router.post('/igdbAPI', Controller.igdbAPI)
router.get('/triviaAPI', Controller.triviaAPI)

module.exports = router