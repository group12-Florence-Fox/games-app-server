const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRETKEY)
}

function checkToken(access_token) {
    return jwt.verify(access_token, process.env.SECRETKEY)
}

module.exports = {generateToken, checkToken}