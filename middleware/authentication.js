const {User} = require('../models')
const {checkToken} = require('../helper/jwt')

module.exports =  async (req, res, next) => {

    try {
        const {access_token} = req.headers
        if (!access_token) {
            res.status(401).json({msg: "Please Login First!"})
        } else {
            const decoded = checkToken(access_token)
            req.loggedInUser = decoded
            const user = await User.findOne({
                where: {
                    id : decoded.id
                }
            })
            if(user) next()
            else {
                res.status(401).json({msg: "Please Login First!"})
            }
        }
    } catch (error) {
        res.status(401).json(error)
    }
}