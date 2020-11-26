const {User} = require('../models')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

class Controller {
    static async register(req, res) {}

    static async login(req, res) {}

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
}

module.exports = Controller