const axios = require('axios')
const {User} = require('../models')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const  {comparePassword} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')

class Controller {
    static async register(req, res) {
        try {
            let newUser = {
                email: req.body.email,
                password: req.body.password
            }
            const data = await User.create(newUser)
            res.status(201).json({id: data.id, email: data.email})
        } catch (error) {
            res.status(400).json({msg: "Email telah digunakan!"})
        }
    }

    static async googleLogin(req, res){
        try {
            let ticket = await client.verifyIdToken({
                idToken: req.body.googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            let payload = await ticket.getPayload()
            let user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if(user){
                await user
            } else {
                user = await User.create({
                    email: payload.email,
                    password: process.env.GOOGLE_SECRETKEY
                })
            }
            const access_token = generateToken({id: user.id, email:user.email}, process.env.SECRET)
            res.status(200).json({access_token})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
    static async login(req, res) {
        try {
            const data = await User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!data) res.status(400).json({msg: "Invalid email or password!"})
            else if(comparePassword(req.body.password, data.password)) {
               
                const access_token =  generateToken({id: data.id, email: data.email})
                res.status(200).json({access_token})

            } else {
                res.status(400).json({msg: "Invalid email or password!"})
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

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