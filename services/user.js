const User = require('../models/User')
module.exports = {
    createUser,
    getUserByEmail,
    
}

async function createUser(username, password, email, gender) {
    
const user = new User({
    email,
    username,
    password,
    gender,
    trips: []
})
user.save()
return user
}
async function getUserByEmail(email) {
    return await User.findOne({ email: {$regex: email, $options: 'i'} })
}
