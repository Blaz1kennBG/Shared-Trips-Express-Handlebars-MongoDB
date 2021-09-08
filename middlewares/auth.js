const User = require('../models/User')
const userService = require('../services/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = () => (req, res, next) => {
    req.auth = {
        register,
        login,
        logout,
        getUserByEmail
    }

    if (readToken(req)) {
        next()

    }
    async function register({ username, password, repeatPassword, email, gender }) {
        if (username == '' || password == '' || repeatPassword == '') {
            throw new Error('All fields are required')
        } else if (password != repeatPassword) {
            throw new Error('Passwords don\'t match')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userService.createUser(username, hashedPassword, email, gender)
        req.user = createToken(user)
    }

    async function login({ email, password }) {
        const user = await userService.getUserByEmail(email)
      
        if (user == null) {
            throw new Error('Wrong email or password')
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                throw new Error("Wrong email or password")
            } else {
                req.user = createToken(user)
            }
        }
    }
    function createToken(user) {
        const userViewModel = { _id: user._id, username: user.username, email: user.email }
        const token = jwt.sign(userViewModel, 'my-very-secret')
        res.cookie('SESSION_DATA', token, { httpOnly: true })
        return userViewModel
    }
    async function logout() {
        res.clearCookie('SESSION_DATA')
        res.redirect('/')
    }
    function readToken(req) {
        
        const token = req.cookies['SESSION_DATA']
   
        if (token) {
            try {
                const userData = jwt.verify(token, 'my-very-secret')
                req.user = userData
                res.locals.user = userData
               
            } catch (err) {
                res.clearCookie('SESSION_DATA')
                res.redirect('/auth/login')
                return false
            }
        }
        return true
    }

}


async function getUserByEmail(email) {
    
    return await User.findOne({ email: {$regex: email, $options: 'i'} }).populate('trips').lean()
}
