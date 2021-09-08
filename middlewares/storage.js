const tripService = require('../services/trip')
async function init() {
    return async(req, res, next) => {
        const storage = Object.assign({}, tripService)
        req.storage = storage
        next()
    }
}


module.exports = {
    init
}
