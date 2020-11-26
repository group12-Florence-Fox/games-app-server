const {
    User
} = require('../models')
const axios = require('axios')
class Controller {
    static async register(req, res) {}

    static async login(req, res) {}

    static igdbAPI(req, res) {
        console.log('@ igdb Api');
        axios({
                url: `https://api.igdb.com/v4/games`,
                method: 'POST',
                headers: {
                    "Client-ID": process.env.CLIENTID_IGDB,
                    "Authorization": 'Bearer ' + process.env.AUTHORIZATION
                },
                data: "fields name, url, release_dates.*, cover.*;"
            })
            .then(response => {
                res.json(response.data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'internal server error'
                })
            })
    }

    static jokesAPI(req, res) {
        console.log('@ jokes API');
        axios({
                url: 'https://sv443.net/jokeapi/v2/joke/Any',
                method: 'GET'
            })
            .then(response => {
                res.json(response.data)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err
                })
            })
    }

    static triviaAPI(req, res) {
        console.log('@ trivia API');
        axios({
                url: 'https://opentdb.com/api.php?amount=10&category=15&difficulty=medium',
                method: 'GET'
            })
            .then(response => {
                res.json(response.data.results)
            })
            .catch(err => {
                res.status(500).json({msg: 'internal server error'})
            })
    }
}

module.exports = Controller