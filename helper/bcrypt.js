const bcrypt = require('bcryptjs')

function generatePassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = { generatePassword, comparePassword }