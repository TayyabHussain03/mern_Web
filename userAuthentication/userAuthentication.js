const jwt = require('jsonwebtoken')
const User = require('../models/register')


const UserAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken
        const tokenVerify = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({ _id: tokenVerify._id, "tokens.token": token })

        if (!user) { throw new Error("user not found") }
        else {
            req.token = token
            req.user = user
            req.userId = user._id
        }
        next()
    } catch (err) {
        res.status(401).send('UnAuthorized User')
        console.log(err)
    }
}

module.exports = UserAuthentication